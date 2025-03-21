import { useState } from "react";

const API_NINJAS_KEY = "UhIObFZZH3Y9F10PVKr27Q==TOKHzUNGJN2P7gjd";
const QUOTES_URL = "https://api.api-ninjas.com/v1/quotes";
const MYMEMORY_URL = "https://api.mymemory.translated.net/get";

export const useQuotes = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(QUOTES_URL, {
        headers: { "X-Api-Key": API_NINJAS_KEY },
      });
      if (!response.ok) {
        throw new Error(`Error en API Ninjas: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.length) throw new Error("No se encontraron frases.");
      const quoteEnglish = data[0].quote;
      const translateResponse = await fetch(
        `${MYMEMORY_URL}?q=${encodeURIComponent(quoteEnglish)}&langpair=en|es`
      );
      if (!translateResponse.ok) {
        throw new Error(`Error en MyMemory: ${translateResponse.status} ${translateResponse.statusText}`);
      }
      const translateData = await translateResponse.json();

      setQuote(translateData.responseData.translatedText);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return { quote, fetchQuote, loading };
};
