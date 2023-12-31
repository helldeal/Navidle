export default function SVGbyRouteType(id: number) {
  let svgDiv = null;

  if (id === 0) {
    svgDiv = (
      <div>
      <svg
        className="w-5 h-5 text-slate-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        fill="currentColor"
      >
        <path
          d="M208,80v48H48V80A24,24,0,0,1,72,56H184A24,24,0,0,1,208,80Z"
          opacity="0.2"
        ></path>
        <path d="M184,48H136V24h32a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16h32V48H72A32,32,0,0,0,40,80V184a32,32,0,0,0,32,32h8L65.6,235.2a8,8,0,1,0,12.8,9.6L100,216h56l21.6,28.8a8,8,0,1,0,12.8-9.6L176,216h8a32,32,0,0,0,32-32V80A32,32,0,0,0,184,48ZM72,64H184a16,16,0,0,1,16,16v40H56V80A16,16,0,0,1,72,64ZM184,200H72a16,16,0,0,1-16-16V136H200v48A16,16,0,0,1,184,200ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm88,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
      </svg>
      </div>
    );
  } else if (id === 3) {
    svgDiv = (
      <div>
      <svg
        className="w-5 h-5 text-slate-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        fill="currentColor"
      >
        <path
          d="M48,184H88v24a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8Zm120,24a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V184H168ZM48,72v40H208V72Z"
          opacity="0.2"
        ></path>
        <path d="M184,32H72A32,32,0,0,0,40,64V208a16,16,0,0,0,16,16H80a16,16,0,0,0,16-16V192h64v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V64A32,32,0,0,0,184,32ZM56,176V120H200v56Zm0-96H200v24H56ZM72,48H184a16,16,0,0,1,16,16H56A16,16,0,0,1,72,48Zm8,160H56V192H80Zm96,0V192h24v16Zm-72-60a12,12,0,1,1-12-12A12,12,0,0,1,104,148Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,148Zm72-68v24a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0ZM24,80v24a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Z"></path>
      </svg>
      </div>
    );
  } else if (id === 4) {
    svgDiv = (
      <div>
      <svg
        className="w-5 h-5 text-slate-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        fill="currentColor"
      >
        <path
          d="M224,125.82V160.1c-14.57,51.07-82.23,68.91-94.19,71.69a7.91,7.91,0,0,1-3.62,0C114.23,229,46.57,211.17,32,160.1V125.82a8,8,0,0,1,5.47-7.6L128,88l90.53,30.22A8,8,0,0,1,224,125.82Z"
          opacity="0.2"
        ></path>
        <path d="M221.06,110.63,208,106.27V56a16,16,0,0,0-16-16H136V24a8,8,0,0,0-16,0V40H64A16,16,0,0,0,48,56v50.27l-13.06,4.36A16,16,0,0,0,24,125.82V160.1a7.73,7.73,0,0,0,.31,2.19c15.72,55.09,86.12,74.06,100.07,77.3a16.19,16.19,0,0,0,7.24,0c13.95-3.24,84.35-22.21,100.07-77.3a7.73,7.73,0,0,0,.31-2.19V125.82A16,16,0,0,0,221.06,110.63ZM64,56H192v44.93L130.53,80.41a8,8,0,0,0-5.06,0L64,100.93ZM216,158.94c-5.78,19-20.55,35.17-43.95,48.12A181.7,181.7,0,0,1,128,224a181.7,181.7,0,0,1-44-16.94C60.56,194.11,45.78,177.93,40,158.94V125.81l80-26.7V168a8,8,0,0,0,16,0V99.11l80,26.71Z"></path>
      </svg>
      </div>
    );
  }

  return svgDiv;
}
