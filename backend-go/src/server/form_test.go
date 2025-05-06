package server

import (
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
		db.GetFormDataAndElementsRow{ID: 2, Name: "black name"},
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
	rows := []db.GetFormDataAndElementsRow{
		db.GetFormDataAndElementsRow{
			ID:          2,
			Title:       "form title",
			CreatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			ID_2:        3,
			Name:        "workspace name",
			CreatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UserID:      4,
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
			UserID:    4,
		},
		FormElements: []FormElement{},
	})
}

func TestParseFormDataAndElements_WithFullDataSingleRow(t *testing.T) {
	assert := require.New(t)
	currentTime := time.Now()
	rows := []db.GetFormDataAndElementsRow{
		db.GetFormDataAndElementsRow{
			ID:          2,
			Title:       "form title",
			CreatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			ID_2:        3,
			Name:        "workspace name",
			CreatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UserID:      4,
			ID_3:        pgtype.Int4{Int32: 5, Valid: true},
			ElementType: db.NullFormElementTypes{FormElementTypes: db.FormElementTypesEmail, Valid: true},
			Value:       pgtype.Text{String: "example@mail.com", Valid: true},
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
			UserID:    4,
		},
		FormElements: []FormElement{
			FormElement{ID: 5, Type: "email", Value: "example@mail.com"},
		},
	})
}

func TestParseFormDataAndElements_WithFullDataMulitRow(t *testing.T) {
	assert := require.New(t)
	currentTime := time.Now()
	rows := []db.GetFormDataAndElementsRow{
		db.GetFormDataAndElementsRow{
			ID:          2,
			Title:       "form title",
			CreatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			ID_2:        3,
			Name:        "workspace name",
			CreatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UserID:      4,
			ID_3:        pgtype.Int4{Int32: 5, Valid: true},
			ElementType: db.NullFormElementTypes{FormElementTypes: db.FormElementTypesEmail, Valid: true},
			Value:       pgtype.Text{String: "example@mail.com", Valid: true},
		},
		db.GetFormDataAndElementsRow{
			ID:          2,
			Title:       "form title",
			CreatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			ID_2:        3,
			Name:        "workspace name",
			CreatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UserID:      4,
			ID_3:        pgtype.Int4{Int32: 6, Valid: true},
			ElementType: db.NullFormElementTypes{FormElementTypes: db.FormElementTypesPhone, Valid: true},
			Value:       pgtype.Text{String: "9876543210", Valid: true},
		},
		db.GetFormDataAndElementsRow{
			ID:          2,
			Title:       "form title",
			CreatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt:   pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			ID_2:        3,
			Name:        "workspace name",
			CreatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UpdatedAt_2: pgtype.Timestamp{Time: currentTime, InfinityModifier: pgtype.Finite, Valid: true},
			UserID:      4,
			ID_3:        pgtype.Int4{Int32: 7, Valid: true},
			ElementType: db.NullFormElementTypes{FormElementTypes: db.FormElementTypesPhone, Valid: true},
			Value:       pgtype.Text{String: "9876543210", Valid: true},
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
			UserID:    4,
		},
		FormElements: []FormElement{
			FormElement{ID: 5, Type: "email", Value: "example@mail.com"},
			FormElement{ID: 6, Type: "phone", Value: "9876543210"},
			FormElement{ID: 7, Type: "phone", Value: "9876543210"},
		},
	})
}
