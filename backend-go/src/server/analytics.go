package server

import "net/http"

func (s *Service) FormAnalyticsDataHandler(w http.ResponseWriter, r *http.Request) {
	s.Conn.Query(r.Context(), `
	`)
	if err := json.NewDecoder(w).Decode(formAnalyticsData); err != nil {
		log.Println(fmt.Errorf("failed to write json:", err))
		w.WriteHeader(http.StatusInternalServerError)
	}
}
