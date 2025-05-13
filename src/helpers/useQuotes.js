import { useState } from "react";

const API_NINJAS_KEY = "UhIObFZZH3Y9F10PVKr27Q==TOKHzUNGJN2P7gjd";
const MYMEMORY_URL = "https://api.mymemory.translated.net/get";

export const useQuotes = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastQuoteEnglish, setLastQuoteEnglish] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const proxyUrl = "https://api.allorigins.win/raw?url=";
      const zenQuoteUrl = "https://zenquotes.io/api/random";

      let quoteEnglish = null;
      let attempts = 0; 

      while ((!quoteEnglish || quoteEnglish === lastQuoteEnglish) && attempts < 5) {
        const response = await fetch(proxyUrl + encodeURIComponent(zenQuoteUrl));
        if (!response.ok) throw new Error(`Error en ZenQuotes: ${response.status}`);
        const data = await response.json();
        quoteEnglish = data[0]?.q;
        attempts++;
      }

      setLastQuoteEnglish(quoteEnglish);

      const blacklist = ['faith', 'pray', 'spiritual', 'blessing'];
      const isReligious = blacklist.some(word => quoteEnglish.toLowerCase().includes(word));
      if (isReligious) {
        fetchQuote();
        return;
      }

      const translateResponse = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(quoteEnglish)}&langpair=en|es`
      );
      if (!translateResponse.ok) {
        throw new Error(`Error en MyMemory: ${translateResponse.status}`);
      }

      const translateData = await translateResponse.json();
      setQuote(translateData.responseData.translatedText);
    } catch (error) {
      console.error("Error obteniendo la frase:", error);
      setQuote("No se pudo cargar la frase. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };


  return { quote, fetchQuote, loading };
};
