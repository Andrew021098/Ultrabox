const whatsappNumber = "5521999999999";

const products = [
  {
    id: 1,
    code: "UB 01",
    image: "assets/produtos/caixas-papelao.jpg",
    name: "Caixas de Papelão Ondulado",
    category: "Caixas",
    description: "Caixas para transporte, estoque, mudança, separação e e-commerce.",
    tags: ["Sob medida", "Alta resistência", "B2B"]
  },
  {
    id: 2,
    code: "UB 02",
    image: "assets/produtos/chapas-papelao.jpg",
    name: "Chapas de Papelão",
    category: "Chapas",
    description: "Chapas para proteção, divisórias, montagem e operações industriais.",
    tags: ["Proteção", "Atacado", "Indústria"]
  },
  {
    id: 3,
    code: "UB 03",
    image: "assets/produtos/papelao-ondulado.jpg",
    name: "Papelão Ondulado Face Simples",
    category: "Papelão Ondulado",
    description: "Rolos de papelão para embalagem, proteção de piso, móveis e peças.",
    tags: ["Rolos", "Logística", "Proteção"]
  },
  {
    id: 4,
    code: "UB 04",
    image: "assets/produtos/caixas-pizza.jpg",
    name: "Caixas para Pizza",
    category: "Alimentos",
    description: "Embalagens para pizzarias, delivery, restaurantes e food service.",
    tags: ["Delivery", "Alimentos", "Personalizável"]
  },
  {
    id: 5,
    code: "UB 05",
    image: "assets/produtos/caixas-bolo-salgados.jpg",
    name: "Caixas para Bolo e Salgados",
    category: "Alimentos",
    description: "Soluções para confeitarias, padarias, festas e eventos.",
    tags: ["Confeitaria", "Eventos", "Atacado"]
  },
  {
    id: 6,
    code: "UB 06",
    image: "assets/produtos/caixa-arquivo.jpg",
    name: "Caixa Arquivo",
    category: "Organização",
    description: "Caixas para documentos, escritórios, empresas e organização interna.",
    tags: ["Escritório", "Organização", "Empresas"]
  },
  {
    id: 7,
    code: "UB 07",
    image: "assets/produtos/caixas-sedex.jpg",
    name: "Caixas para Sedex e Encomendas",
    category: "E-commerce",
    description: "Caixas para lojas virtuais, envios, transportadoras e Correios.",
    tags: ["E-commerce", "Correios", "Envios"]
  },
  {
    id: 8,
    code: "UB 08",
    image: "assets/produtos/embalagens-personalizadas.jpg",
    name: "Embalagens Personalizadas",
    category: "Sob Medida",
    description: "Projetos conforme medida, aplicação, quantidade e necessidade comercial.",
    tags: ["Projeto especial", "Consultivo", "Marca própria"]
  },
  {
    id: 9,
    code: "UB 09",
    image: "assets/produtos/papel-capa-miolo.jpg",
    name: "Papel Capa e Miolo",
    category: "Papel",
    description: "Papéis para produção, reforço, fabricação e composição de embalagens.",
    tags: ["Gramaturas", "Indústria", "Produção"]
  },
  {
    id: 10,
    code: "UB 10",
    image: "assets/produtos/outro.jpg",
    name: "Outro Produto",
    category: "Papelão",
    description: "Outros produtos de papelão.",
    tags: ["Gramaturas", "Indústria", "Produção"]
  }
];

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productSelect = document.getElementById("productSelect");
const modal = document.getElementById("quoteModal");
const quoteForm = document.getElementById("quoteForm");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeModalBackdrop = document.getElementById("closeModalBackdrop");
const floatingWhatsapp = document.getElementById("floatingWhatsapp");
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

const openButtons = [
  document.getElementById("openQuoteHeader"),
  document.getElementById("openQuoteHero"),
  document.getElementById("openQuoteBottom")
];

function init() {
  renderCategories();
  renderProductOptions();
  renderProducts(products);
  bindEvents();
  setupFloatingWhatsapp();
}

function renderCategories() {
  const categories = [...new Set(products.map(product => product.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function renderProductOptions() {
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
}

function renderProducts(list) {
  productsGrid.innerHTML = "";

  if (!list.length) {
    productsGrid.innerHTML = `
      <div class="empty">
        Nenhum produto encontrado. Tente buscar por caixa, chapa, pizza ou papelão.
      </div>
    `;
    return;
  }

  list.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-photo">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.parentElement.classList.add('photo-missing'); this.remove();"
        />
      </div>

      <div class="product-info">
        <span class="product-code">${product.code}</span>

        <span class="product-category">${product.category}</span>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="product-meta">
          ${product.tags.map(tag => `<span>${tag}</span>`).join("")}
        </div>

        <button class="btn btn-primary" data-product="${product.name}">
          Solicitar cotação
        </button>
      </div>
    `;

    productsGrid.appendChild(card);
  });

  document.querySelectorAll("[data-product]").forEach(button => {
    button.addEventListener("click", () => {
      productSelect.value = button.dataset.product;
      openModal();
    });
  });
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;

  const filtered = products.filter(product => {
    const searchableText = [
      product.code,
      product.name,
      product.description,
      product.category,
      product.tags.join(" ")
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);
    const matchesCategory = category === "todos" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

function openModal() {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function sendQuoteToWhatsapp() {
  const name = document.getElementById("clientName").value.trim();
  const company = document.getElementById("clientCompany").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const product = document.getElementById("productSelect").value;
  const quantity = document.getElementById("quantity").value.trim();
  const details = document.getElementById("details").value.trim();

  const message = `
Olá, gostaria de solicitar uma cotação.

Nome: ${name}
Empresa: ${company || "Não informado"}
WhatsApp: ${phone}

Produto de interesse: ${product}
Quantidade aproximada: ${quantity}

Medidas, cidade ou observações:
${details || "Não informado"}

Aguardo retorno da equipe comercial.
  `.trim();

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function setupFloatingWhatsapp() {
  const message = "Olá, gostaria de solicitar uma cotação de embalagens.";
  floatingWhatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function bindEvents() {
  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

  openButtons.forEach(button => {
    if (button) button.addEventListener("click", openModal);
  });

  closeModalBtn.addEventListener("click", closeModal);
  closeModalBackdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  quoteForm.addEventListener("submit", event => {
    event.preventDefault();
    sendQuoteToWhatsapp();
  });

  menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
    });
  });
}

init();
