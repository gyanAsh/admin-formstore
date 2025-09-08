package endpoints

import (
	"bytes"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http/httptest"
	"testing"
)

func deleteWorkspace(workspaceID int) error {
        //
        // delete workspace - upon test success or failure
        //
	r := httptest.NewRequest("DELETE", "http://localhost:4000/api/workspace/{workspace_id}", nil)
	r.SetPathValue("workspace_id", fmt.Sprint(workspaceID))
        r.Header.Add("Content-Type", "application/json")
        r.Header.Add("Authorization", fmt.Sprintf("Bearer %v", AUTH_TOKEN))
        w := httptest.NewRecorder()

        s.WorkspaceDeleteHandler(w, r)

        resp := w.Result()
        if resp.StatusCode != 200 && resp.StatusCode != 201 {
                return fmt.Errorf("failed to delete workspace: manual cleanup the data to bring it back to consistant state")
        }
        var responseBody map[string]any
        if err := json.NewDecoder(resp.Body).Decode(&responseBody); err != nil {
                log.Println("json decoding error:", err)
        }
        log.Println(responseBody)
        return nil
}

func createFormPublishAndSubmit(workspaceID int) error {
	// steps
	// 1. create the workspace (outside this function)
	// 2. create the form
	// 3. publish the form
	// 4. finally submit one record for the form
        // 5. delete workspace (outside this function)

	//
	// 2. create form
	//
	formTitle := rand.Text()[:12]
	formData, err := json.Marshal(map[string]any{
		"workspace_id": workspaceID,
		"title":        formTitle,
	})
	if err != nil {
		return fmt.Errorf("form data json request object error: %v\n", err)
	}

        r := httptest.NewRequest("POST", "http://localhost:4000/api/form", bytes.NewBuffer(formData))
	r.Header.Add("Content-Type", "application/json")
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %v", AUTH_TOKEN))
        w := httptest.NewRecorder()

	s.FormCreateHandler(w, r)

        resp := w.Result()
	var respBody map[string]any
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		if err := json.NewDecoder(resp.Body).Decode(&respBody); err != nil {
			return fmt.Errorf("incorrect status code: %d with body: %v", resp.StatusCode, respBody)
		} else {
			log.Println(err)
			respBodyText, err := io.ReadAll(resp.Body)
			if err != nil {
				return fmt.Errorf("incorrect status code: %d with body: %v", resp.StatusCode, string(respBodyText))
			} else {
				return fmt.Errorf("incorrect status code: %d with no body", resp.StatusCode)
			}
		}
	}
	if err = json.NewDecoder(resp.Body).Decode(&respBody); err != nil {
		return fmt.Errorf("json decode after success: %v", err)
	}
	formID_f, ok := respBody["id"].(float64)
	if !ok {
		return fmt.Errorf("form id not found in response body: %v", respBody)
	}
	formID := int(formID_f)

	//
	// 3. publish form
	//

	formPublishPayload := `{
  "design": {
    "button": {
      "bgColor": "#ffffffff",
      "borderColor": "#ffffffff",
      "textColor": "#000000ff",
      "variant": "solid"
    },
    "description": {
      "color": "#f2f7fcff",
      "family": "\"IBM Plex Serif\", serif",
      "italics": false,
      "letter_spacing": "-0.05em",
      "size": "30px",
      "weight": "light"
    },
    "element": {
      "bgColor": "#ffffffff",
      "borderColor": "#ffffffff",
      "textColor": "#000000ff",
      "variant": "solid"
    },
    "label": {
      "color": "#f2f7fcff",
      "family": "\"IBM Plex Serif\", serif",
      "italics": false,
      "letter_spacing": "0.025em",
      "size": "60px",
      "weight": "bold"
    },
    "layout": {
      "bgCustomValue": {
        "value": ""
      },
      "bgImageValue": {
        "imageUrl": ""
      },
      "bgSolidValue": {
        "color": "#000000ff"
      },
      "bgType": "solid",
      "elementSpacing": "12px",
      "spread": false,
      "textAlign": "center"
    }
  },
  "elements": [
    {
      "seq_num": 1,
      "type": "welcome",
      "labels": {
        "title": "Welcome!👋 We're glad you're here.",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "btnText": "Get Started"
      }
    },
    {
      "seq_num": 2,
      "type": "email",
      "labels": {
        "title": "Email Address...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "placeholder": "example@gmail.com"
      }
    },
    {
      "seq_num": 3,
      "type": "address",
      "labels": {
        "title": "Address...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "city": {
          "label": "City",
          "placeholder": "Enter your City Address",
          "required": true,
          "show": true
        },
        "country": {
          "label": "Country",
          "placeholder": "Enter your Country",
          "required": true,
          "show": true
        },
        "line1": {
          "label": "Address Line 1",
          "placeholder": "Enter your Address Line 1",
          "required": true,
          "show": true
        },
        "line2": {
          "label": "Address Line 2",
          "placeholder": "Enter your Address Line 2",
          "required": true,
          "show": true
        },
        "state": {
          "label": "State",
          "placeholder": "Enter your State Address",
          "required": true,
          "show": true
        },
        "zip": {
          "label": "Zip Code",
          "placeholder": "Enter your Address' Zip Code",
          "required": true,
          "show": true
        }
      }
    },
    {
      "seq_num": 4,
      "type": "phone",
      "labels": {
        "title": "Phone...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "placeholder": "+1 234 567 890"
      }
    },
    {
      "seq_num": 5,
      "type": "website",
      "labels": {
        "title": "Website's Link...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "placeholder": "https://"
      }
    },
    {
      "seq_num": 6,
      "type": "longtext",
      "labels": {
        "title": "Write Paragraph...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "maxLength": 1000,
        "minLength": 1,
        "placeholder": "Add your text here..."
      }
    },
    {
      "seq_num": 7,
      "type": "text",
      "labels": {
        "title": "Write...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "maxLength": 150,
        "minLength": 1,
        "placeholder": "Add your text here..."
      }
    },
    {
      "seq_num": 8,
      "type": "multiselect",
      "labels": {
        "title": "Select Multi...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "options": [
          {
            "id": "eVCXdnMDdzqZ",
            "text": "Option 1"
          }
        ]
      }
    },
    {
      "seq_num": 9,
      "type": "singleselect",
      "labels": {
        "title": "Select Single...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "options": [
          {
            "id": "RoTRccXWkC46",
            "text": "Option 1"
          }
        ]
      }
    },
    {
      "seq_num": 10,
      "type": "boolean",
      "labels": {
        "title": "Yes or No...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "noBtnText": "No",
        "yesBtnText": "Yes"
      }
    },
    {
      "seq_num": 11,
      "type": "consent",
      "labels": {
        "title": "I accept...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "acceptBtnText": "I accept"
      }
    },
    {
      "seq_num": 12,
      "type": "number",
      "labels": {
        "title": "Number...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "placeholder": "42"
      }
    },
    {
      "seq_num": 13,
      "type": "date",
      "labels": {
        "title": "Date...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "activateMinMaxRange": false,
        "defaultValue": "2025-08-31",
        "maxValue": "2025-09-30",
        "minValue": "2025-08-01"
      }
    },
    {
      "seq_num": 14,
      "type": "nps",
      "labels": {
        "title": "Net Promoter Score...",
        "description": ""
      },
      "required": false,
      "validations": {}
    },
    {
      "seq_num": 15,
      "type": "rating",
      "labels": {
        "title": "Rate...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "iconLength": 5,
        "ratingIcon": "star"
      }
    },
    {
      "seq_num": 16,
      "type": "ranking",
      "labels": {
        "title": "Ranking...",
        "description": ""
      },
      "required": false,
      "validations": {},
      "properties": {
        "options": [
          {
            "id": "a2iell24UasT",
            "text": "Option 1"
          }
        ]
      }
    }
  ]
}`
	var formPublishDataMap map[string]any
	if err = json.Unmarshal([]byte(formPublishPayload), &formPublishDataMap); err != nil {
		return fmt.Errorf("failed to parse form payload string data: %v", err)
	}
	formPublishData, err := json.Marshal(map[string]any{
		"form_id":  formID,
		"design":   formPublishDataMap["design"],
		"elements": formPublishDataMap["elements"],
	})
	if err != nil {
		return fmt.Errorf("form publish data marshal error: %v", err)
	}

	r = httptest.NewRequest("POST", "http://localhost:4000/api/form/publish", bytes.NewBuffer(formPublishData))
	r.Header.Add("Content-Type", "application/json")
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AUTH_TOKEN))
	w = httptest.NewRecorder()

	s.FormPublishHandler(w, r)
	resp = w.Result()
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
                var resposeBody map[string]any
                if err := json.NewDecoder(resp.Body).Decode(&resposeBody); err != nil {
                        log.Println("json body error: ", err)
                } else {
                        log.Println("json body: ", resposeBody)
                }
		return fmt.Errorf("form publish failed: %v", err)
	}

	return nil
}

func TestPublishedFormSubmit(t *testing.T) {
	//
	// create workspace
	//
	workspaceName := rand.Text()[:12]
	workspaceData, err := json.Marshal(map[string]string{
		"name": workspaceName,
	})
	if err != nil {
		t.Fatalf("json marshal request data: %v\n", err)
	}
	r := httptest.NewRequest("POST", "http://localhost:4000/api/workspace", bytes.NewBuffer(workspaceData))
	r.Header.Add("Content-Type", "application/json")
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AUTH_TOKEN))
	w := httptest.NewRecorder()

	s.WorkspaceCreateHandler(w, r)

	resp := w.Result()
	var message map[string]any
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		t.Fatalf("status code %v", resp.StatusCode)
	}
	if err = json.NewDecoder(resp.Body).Decode(&message); err != nil {
		t.Fatalf("json decoding response body: %v\n", err)
	}
	workspaceID_f, ok := message["id"].(float64)
	if !ok {
		t.Fatalf("workspace_id float conversion failed")
	}
	workspaceID := int(workspaceID_f)

        err = createFormPublishAndSubmit(workspaceID)
        if err != nil {
                err1 := deleteWorkspace(workspaceID)
                if err1 != nil {
                        log.Println(err1)
                }
                t.Fatalf("create form published submit failed with error: %v", err)
        } else {
                err1 := deleteWorkspace(workspaceID)
                if err1 != nil {
                        t.Fatalf("failed to delete workspaces with error: %v", err1)
                }
        }
}
