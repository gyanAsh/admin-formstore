package server

import (
	"encoding/hex"
	"fmt"
	"testing"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/stretchr/testify/require"
	"local.formstore.admin/db"
)

func TestParseFormDataAndElements_WithEmptyValue(t *testing.T) {
	assert := require.New(t)
	rows := []db.GetFormDataAndElementsRow{}
	formData := parseFormDataAndElements(rows)

	assert.Equal(formData, FormData{FormElements: []FormElement{}})
	assert.Equal(formData.Form, Form{})
	assert.Equal(formData.Form.ID, int64(0))
	assert.Equal(formData.Form.Title, "")
	assert.Equal(formData.Workspace, Workspace{})
	assert.Equal(formData.Workspace.ID, int64(0))
	assert.Equal(formData.Workspace.Name, "")
}

func TestParseFormDataAndElements_WithPartialFill(t *testing.T) {
	assert := require.New(t)
	rows := []db.GetFormDataAndElementsRow{
		{ID: 2, Name: "black name"},
	}
	formData := parseFormDataAndElements(rows)
	assert.Equal(formData, FormData{
		Form:         Form{ID: 2},
		Workspace:    Workspace{Name: "black name"},
		FormElements: []FormElement{},
	})
}

func TestParseFormDataAndElements_WithNonElements(t *testing.T) {
	assert := require.New(t)
	currentTime := time.Now()
	uuidString := "eef734b4-119b-4665-9497-3de4ebb107a1"
	userIDa, err := hex.DecodeString("eef734b4119b466594973de4ebb107a1")
	if err != nil {
		t.Fatal(err)
	}
	if len(userIDa) != 16 {
		t.Fatal(fmt.Errorf("failed to create user id: invalid size of uuid"))
	}
	userIDb := [16]byte(userIDa)
	rows := []db.GetFormDataAndElementsRow{
		{
			ID:          2,
			Title:       "form title",
			CreatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			ID_2:        3,
			Name:        "workspace name",
			CreatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UserID:      pgtype.UUID{Bytes: userIDb, Valid: true},
		},
	}
	formData := parseFormDataAndElements(rows)
	assert.Equal(formData, FormData{
		Form: Form{
			ID:        2,
			Title:     "form title",
			CreatedAt: currentTime,
			UpdatedAt: currentTime,
		},
		Workspace: Workspace{
			ID:        3,
			Name:      "workspace name",
			CreatedAt: currentTime,
			UpdatedAt: currentTime,
			UserID:    uuidString,
		},
		FormElements: []FormElement{},
	})
}

func TestParseFormDataAndElements_WithFullDataSingleRow(t *testing.T) {
	assert := require.New(t)
	currentTime := time.Now()
	uuidString := "eef734b4-119b-4665-9497-3de4ebb107a1"
	userIDa, err := hex.DecodeString("eef734b4119b466594973de4ebb107a1")
	if err != nil {
		t.Fatal(err)
	}
	if len(userIDa) != 16 {
		t.Fatal(fmt.Errorf("failed to create user id: invalid size of uuid"))
	}
	userIDb := [16]byte(userIDa)
	rows := []db.GetFormDataAndElementsRow{
		{
			ID:          2,
			Title:       "form title",
			CreatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			ID_2:        3,
			Name:        "workspace name",
			CreatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UserID:      pgtype.UUID{Bytes: userIDb, Valid: true},
			ID_3:        pgtype.Int4{Int32: 5, Valid: true},
			Type:        db.NullFormElementTypes{FormElementTypes: db.FormElementTypesEmail, Valid: true},
			Label:       pgtype.Text{String: "enter the email", Valid: true},
			Description: pgtype.Text{String: "this is the description", Valid: true},
		},
	}
	formData := parseFormDataAndElements(rows)
	assert.Equal(formData, FormData{
		Form: Form{
			ID:        2,
			Title:     "form title",
			CreatedAt: currentTime,
			UpdatedAt: currentTime,
		},
		Workspace: Workspace{
			ID:        3,
			Name:      "workspace name",
			CreatedAt: currentTime,
			UpdatedAt: currentTime,
			UserID:    uuidString,
		},
		FormElements: []FormElement{
			{ID: 5, Type: "email", Label: "enter the email", Description: "this is the description"},
		},
	})
}

func TestParseFormDataAndElements_WithFullDataMulitRow(t *testing.T) {
	assert := require.New(t)
	currentTime := time.Now()
	uuidString := "eef734b4-119b-4665-9497-3de4ebb107a1"
	userIDa, err := hex.DecodeString("eef734b4119b466594973de4ebb107a1")
	if err != nil {
		t.Fatal(err)
	}
	if len(userIDa) != 16 {
		t.Fatal(fmt.Errorf("failed to create user id: invalid size of uuid"))
	}
	userIDb := [16]byte(userIDa)
	rows := []db.GetFormDataAndElementsRow{
		{
			ID:          2,
			Title:       "form title",
			CreatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			ID_2:        3,
			Name:        "workspace name",
			CreatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UserID:      pgtype.UUID{Bytes: userIDb, Valid: true},
			ID_3:        pgtype.Int4{Int32: 5, Valid: true},
			Type:        db.NullFormElementTypes{FormElementTypes: db.FormElementTypesEmail, Valid: true},
			Label:       pgtype.Text{String: "example@mail.com", Valid: true},
			Description: pgtype.Text{String: "description", Valid: true},
		},
		{
			ID:          2,
			Title:       "form title",
			CreatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			ID_2:        3,
			Name:        "workspace name",
			CreatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UserID:      pgtype.UUID{Bytes: userIDb, Valid: true},
			ID_3:        pgtype.Int4{Int32: 6, Valid: true},
			Type:        db.NullFormElementTypes{FormElementTypes: db.FormElementTypesPhone, Valid: true},
			Label:       pgtype.Text{String: "9876543210", Valid: true},
			Description: pgtype.Text{String: "description", Valid: true},
		},
		{
			ID:          2,
			Title:       "form title",
			CreatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			ID_2:        3,
			Name:        "workspace name",
			CreatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UserID:      pgtype.UUID{Bytes: userIDb, Valid: true},
			ID_3:        pgtype.Int4{Int32: 7, Valid: true},
			Type:        db.NullFormElementTypes{FormElementTypes: db.FormElementTypesPhone, Valid: true},
			Label:       pgtype.Text{String: "9876543210", Valid: true},
			Description: pgtype.Text{String: "description", Valid: true},
		},
	}
	formData := parseFormDataAndElements(rows)
	assert.Equal(formData, FormData{
		Form: Form{
			ID:        2,
			Title:     "form title",
			CreatedAt: currentTime,
			UpdatedAt: currentTime,
		},
		Workspace: Workspace{
			ID:        3,
			Name:      "workspace name",
			CreatedAt: currentTime,
			UpdatedAt: currentTime,
			UserID:    uuidString,
		},
		FormElements: []FormElement{
			{ID: 5, Type: "email", Label: "example@mail.com", Description: "description"},
			{ID: 6, Type: "phone", Label: "9876543210", Description: "description"},
			{ID: 7, Type: "phone", Label: "9876543210", Description: "description"},
		},
	})
}
