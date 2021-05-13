import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {
  const isMounted = useRef(true); //Esto nos sirve para evitar errores de una renderización cancelada o desmontada
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  //Verificar que la referencia useRef cambié cuando el componente useFetch se desmonte
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //Cambiará el estado sólo si el componente está montado segun la refeeencia que hicimos  useRef
        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data,
          });
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: 'No se pudo cargar la info',
        });
      });
  }, [url]);

  return state;
};
