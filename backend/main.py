from fastapi import FastAPI, Query
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Permitir conexiones desde cualquier frontend (para demo)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Cargar datos
df = pd.read_csv("players.csv")

@app.get("/search")
def search_players(position: str = Query(None), min_xg: float = 0.0, min_xa: float = 0.0):
    results = df.copy()
    if position:
        results = results[results["position"].str.contains(position, case=False)]
    results = results[(results["xg90"] >= min_xg) & (results["xa90"] >= min_xa)]
    return results.to_dict(orient="records")

@app.get("/")
def root():
    return {"message": "Bienvenido a YouScout API - demo"}
