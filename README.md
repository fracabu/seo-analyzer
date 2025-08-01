# Gemini SEO Analyzer

Un semplice strumento di analisi SEO on-page che utilizza l'API di Gemini per fornire approfondimenti su titolo, meta description, intestazioni, immagini e conteggio delle parole di un sito web, basandosi su un URL e una parola chiave target.

*(Immagine dimostrativa dell'interfaccia utente: Un design pulito e moderno con tema scuro. Un modulo centrale permette di inserire URL e parola chiave, mentre i risultati dell'analisi appaiono sotto forma di schede informative.)*

## ✨ Funzionalità

- **Analisi del Tag Title:** Controlla la lunghezza ottimale (50-60 caratteri) e la presenza della parola chiave.
- **Analisi della Meta Description:** Verifica la lunghezza ottimale (120-155 caratteri) e la presenza della parola chiave.
- **Struttura dei Tag H1:** Controlla che ci sia un unico tag H1 e che contenga la parola chiave.
- **Attributi Alt delle Immagini:** Calcola la percentuale di immagini con testi alternativi.
- **Conteggio Parole:** Fornisce il numero totale di parole nella pagina, utile per valutare la profondità del contenuto.
- **Posizionamento della Parola Chiave:** Riassume la presenza della parola chiave nei tre elementi on-page più importanti: titolo, meta description e H1.

## 🚀 Stack Tecnologico

- **Frontend:** React, TypeScript
- **API:** Google Gemini (`@google/genai`)
- **Styling:** Tailwind CSS
- **Servito come:** App statica con `importmap` per la gestione dei moduli ES.

## ⚙️ Come Avviare il Progetto

Questo progetto è progettato per essere eseguito come un'applicazione web statica senza un processo di build complesso.

### Prerequisiti

- **Node.js:** Consigliato per l'uso di `npx`.
- **Chiave API di Google Gemini:** È necessaria una chiave API valida. Puoi ottenerne una gratuitamente da [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installazione e Avvio

**1. Configurazione della Chiave API**

L'applicazione si aspetta che la chiave API di Gemini sia disponibile in una variabile d'ambiente `process.env.API_KEY`. In un ambiente di produzione (come Vercel, Netlify, etc.), questa variabile viene configurata nelle impostazioni del sito.

Per lo **sviluppo locale**, crea un file `.env` nella root del progetto:

```bash
# .env
GEMINI_API_KEY=LA_TUA_CHIAVE_API_QUI
```

**IMPORTANTE:** Il file `.env` è già incluso nel `.gitignore` e non sarà committato nel repository.

**2. Avvia un Server Web Locale**

Poiché i browser applicano restrizioni di sicurezza (CORS) sul caricamento di moduli JavaScript (`type="module"`) dal file system locale, è necessario servire i file tramite un server web.

Se hai Node.js installato, il modo più semplice è usare `serve`. Esegui questo comando dalla directory principale del progetto:

```bash
npx serve
```

In alternativa, puoi usare l'estensione "Live Server" per VS Code o il server integrato di Python:

```bash
# Per Python 3
python -m http.server

# Per Python 2
python -m SimpleHTTPServer
```

**3. Apri l'App**

Una volta che il server è in esecuzione, apri il tuo browser e naviga all'URL fornito (es. `http://localhost:3000` o `http://localhost:8000`). Ora puoi iniziare ad analizzare i siti web!

## 🚀 Deployment

### Vercel
1. Collega il repository GitHub a Vercel
2. Nelle impostazioni del progetto Vercel, aggiungi la variabile d'ambiente:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: La tua chiave API di Google Gemini
3. Fai il re-deploy del progetto

### Netlify
1. Collega il repository GitHub a Netlify
2. Vai su Site settings → Environment variables
3. Aggiungi la variabile d'ambiente:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: La tua chiave API di Google Gemini
4. Fai il re-deploy del progetto

## 💡 Come Funziona

1.  L'utente inserisce l'URL di un sito web e una parola chiave target.
2.  Al click sul pulsante "Analizza", l'applicazione costruisce un prompt specifico per il modello Gemini.
3.  Il prompt istruisce il modello `gemini-2.5-flash` a comportarsi come un esperto SEO e ad analizzare la pagina fornita.
4.  Per garantire una risposta affidabile e strutturata, la richiesta API include uno `responseSchema` che definisce il formato JSON esatto dell'output desiderato.
5.  L'API di Gemini restituisce i dati di analisi in formato JSON.
6.  L'applicazione interpreta i dati e li visualizza nell'interfaccia utente, utilizzando indicatori visivi (verde, giallo, rosso) per evidenziare i punti di forza e le aree di miglioramento.
