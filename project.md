by wykorzystać naszą wiedzę w praktyce, zbudujemy teraz własny serwer API. Co ważne, skonstruujemy tylko część backendową, a do testowania endpointów użyjemy Postmana.

Naszym zadaniem będzie zbudowanie serwera API do obsługi księgi klientów firmy, który udostępni następujące endpointy:

# GET /testimonials – zwracanie całej listy wpisów.
# GET /testimonials/:id – zwracanie konkretnego wpisu.
# GET /testimonials/random – zwracanie losowego wpisu.
# POST /testimonials – dodawanie nowego wpisu na bazie req.body, otrzymanego od     części frontendowej.
# PUT /testimonials/:id – modyfikacja wpisu o danym id na bazie req.body otrzymanego od części frontendowej.
# DELETE /testimonia