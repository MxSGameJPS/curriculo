document.addEventListener("DOMContentLoaded", function () {
  // Adiciona classes aos elementos quando eles aparecem na viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".job, .education-item, section").forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Adiciona botão para exportar como PDF
  const header = document.querySelector("header");
  const exportButton = document.createElement("button");
  exportButton.className = "export-pdf";
  exportButton.innerHTML = "Exportar como PDF";

  // Função melhorada para exportar PDF
  exportButton.addEventListener("click", function () {
    // Prepara o documento para impressão
    const printStyles = document.createElement("style");
    printStyles.innerHTML = `
      @media print {
        body * {
          visibility: visible;
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        .fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(printStyles);

    // Remove temporariamente os efeitos de fade para garantir que tudo apareça no PDF
    document.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("visible");
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    // Pequeno delay para garantir que os estilos sejam aplicados
    setTimeout(() => {
      window.print();

      // Retorna ao estado original após a impressão
      setTimeout(() => {
        document.head.removeChild(printStyles);
        document.querySelectorAll(".fade-in:not(.visible)").forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
        });
      }, 1000);
    }, 300);
  });

  header.appendChild(exportButton);

  // Adiciona estilo para o botão de exportação
  const style = document.createElement("style");
  style.innerHTML = `
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .export-pdf {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: var(--accent-color);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      transition: background-color 0.3s ease;
    }
    
    .export-pdf:hover {
      background-color: #2980b9;
    }
    
    @media print {
      .export-pdf {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);

  // Adiciona posicionamento relativo ao header para o botão de exportação
  header.style.position = "relative";
});
