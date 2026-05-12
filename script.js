// ======================================================================================================
// JS GLOBAL
// ======================================================================================================

// CONFIGURACIÓN
const WA_NUMBER = '573152349836'; // Número de WhatsApp (57 + número sin espacios)


// UTILIDADES
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// =======================================================================================================
// HEADER OCULTAR / MOSTRAR AL SCROLL
// =======================================================================================================
document.addEventListener("DOMContentLoaded", () => {
    let lastScroll = 0;
    const header = document.getElementById("siteHeader");

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 80) {
            // Bajando → header pequeño
            header.classList.add("shrink");
        } else {
            // Subiendo → header normal
            header.classList.remove("shrink");
        }

        lastScroll = currentScroll;
    });
});

// ==========================================================================================================
// MENU Y SUBMENU
// ==========================================================================================================

const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const catalogoMenu = document.getElementById("catalogoMenu");
const closeMainMenu = document.getElementById("closeMainMenu");
const closeCatalogo = document.getElementById("closeCatalogo");
const openCatalogo = document.getElementById("openCatalogo");
const overlay = document.getElementById("overlay");

// Abrir menú principal
menuToggle.onclick = () => {
  sideMenu.classList.add("show");
  overlay.classList.add("show");
};

// Cerrar menú principal
closeMainMenu.onclick = () => {
  sideMenu.classList.remove("show");
  overlay.classList.remove("show");
};

// Abrir catálogo
openCatalogo.onclick = () => {
  sideMenu.classList.remove("show");
  catalogoMenu.classList.add("show");
};

// Cerrar catálogo y volver al menú principal
closeCatalogo.onclick = () => {
  catalogoMenu.classList.remove("show");
  sideMenu.classList.add("show");
};

// 🔥 Cerrar tocando afuera
overlay.onclick = () => {
  sideMenu.classList.remove("show");
  catalogoMenu.classList.remove("show");
  overlay.classList.remove("show");
};

// =========================================================================================================
// JS INICIO
// =========================================================================================================

// FUNCION DE CARRUSEL HORIZONTAL
const slides = $$('.slide');
const dots   = $$('.dot');
let currentIndex = 0;

function showSlide(index) {
  const slidesContainer = $('.slides');
  if (slidesContainer) slidesContainer.style.transform = `translateX(-${index * 100}%)`;

  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));

  currentIndex = index;
}

// Controles del slider principal
$('.prev')?.addEventListener('click', () => {
  let index = currentIndex - 1;
  if (index < 0) index = slides.length - 1;
  showSlide(index);
});

$('.next')?.addEventListener('click', () => {
  let index = (currentIndex + 1) % slides.length;
  showSlide(index);
});

dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

// Auto slide (5 seg.)
setInterval(() => {
  let index = (currentIndex + 1) % slides.length;
  showSlide(index);
}, 5000);


// CARRUSEL BENEFICIOS

document.addEventListener("DOMContentLoaded", () => {
  const benefits = $$('.benefit2');
  const prevBtn  = $('.prev2');
  const nextBtn  = $('.next2');
  const dots2    = $$('.dot2');
  let currentBenefit = 0;

  function showBenefit(index) {
    if (index < 0) index = benefits.length - 1;
    if (index >= benefits.length) index = 0;

    currentBenefit = index;
    benefits.forEach((b, i) => b.classList.toggle("active", i === index));
    dots2.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  prevBtn?.addEventListener("click", () => showBenefit(currentBenefit - 1));
  nextBtn?.addEventListener("click", () => showBenefit(currentBenefit + 1));
  dots2.forEach((dot, i) => dot.addEventListener("click", () => showBenefit(i)));

  showBenefit(0); // Mostrar el primero al cargar
});

// =========================================================================================================
// JS NOSOTROS
// =========================================================================================================

// CARRUSEL NOSOTROS
document.addEventListener("DOMContentLoaded", () => {
  const nSlides = $$('.carousel-slide');
  const nDots   = $$('.carousel-dots .dot');
  const prevBtn = $('.carousel-prev');
  const nextBtn = $('.carousel-next');
  let nIndex = 0;

  function showNSlide(index) {
    if (index < 0) index = nSlides.length - 1;
    if (index >= nSlides.length) index = 0;

    nSlides.forEach((s, i) => s.classList.toggle('active', i === index));
    nDots.forEach((d, i) => d.classList.toggle('active', i === index));
    nIndex = index;
  }

  prevBtn?.addEventListener('click', () => showNSlide(nIndex - 1));
  nextBtn?.addEventListener('click', () => showNSlide(nIndex + 1));
  nDots.forEach((dot, i) => dot.addEventListener('click', () => showNSlide(i)));

  // Auto slide (3 seg.)
  setInterval(() => showNSlide(nIndex + 1), 3000);

  showNSlide(0);
});

// ZOOM IMAGEN

document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".main-image");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  let currentIndex = 0;

  // Cambiar imagen al dar click en miniatura
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentIndex = index;
      mainImage.src = thumb.src;
      thumbnails.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  // Abrir modal al dar click en imagen principal
  mainImage.addEventListener("click", () => {
    modal.style.display = "flex"; // se muestra solo al hacer click
    modalImg.src = mainImage.src;
  });

  // Cerrar modal al tocar fuera de la imagen
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Swipe para móvil (opcional)
  let startX = 0;
  mainImage.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  mainImage.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 40) {
      currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    } else if (startX - endX > 40) {
      currentIndex = (currentIndex + 1) % thumbnails.length;
    } else {
      return;
    }
    mainImage.src = thumbnails[currentIndex].src;
    thumbnails.forEach(t => t.classList.remove("active"));
    thumbnails[currentIndex].classList.add("active");
  });
});

/* ============================================================================================================
                         SOMBREROS JS (PRODUCTOS)
===============================================================================================================*/

const productos = {

  "sombrero-trevisonegro": {
    nombre: "Sombrero Gamuza Treviso Negro",
    precio: "$180.000 COP",
    img1: "/Images/Productos/Sombreros/som01.avif",
    img2: "/Images/Productos/Sombreros/som01_.avif",
    img3: "/Images/Productos/Sombreros/som01__.avif",
    desc1: "Elegancia y estilo se unen en nuestro Sombrero Treviso de gamuza en color negro, ideal para cualquier ocasión.",
    desc2: "Cuenta con correa negra ajustable para un ajuste cómodo y seguro. Perfecto para outfits formales y casuales."
  },

  "sombrero-trevisocafe": {
    nombre: "Sombrero Gamuza Treviso Café",
    precio: "$180.000 COP",
    img1: "/Images/Productos/Sombreros/som02.avif",
    img2: "/Images/Productos/Sombreros/som02_.avif",
    img3: "/Images/Productos/Sombreros/som02__.avif",
    desc1: "Elegancia y estilo se unen en nuestro Sombrero Treviso de gamuza en color café, diseñado para quienes buscan un accesorio sofisticado y versátil. Su acabado en gamuza de alta calidad aporta un tacto suave y un look distinguido, ideal para cualquier ocasión.",
    desc2: "Cuenta con una correa café ajustable, que añade un detalle refinado y permite un ajuste cómodo y seguro. Perfecto para complementar tanto outfits formales como casuales, convirtiéndose en un accesorio imprescindible para quienes valoran el estilo y la distinción."
  },

  "sombrero-trevisoarena": {
  nombre: "Sombrero Gamuza Treviso Arena",
  precio: "$180.000 COP",
  img1: "/Images/Productos/Sombreros/som03.avif",
  img2: "/Images/Productos/Sombreros/som03_.avif",
  img3: "/Images/Productos/Sombreros/som03__.avif",
  desc1: "Elegancia y estilo se unen en nuestro Sombrero Treviso de gamuza en color arena, diseñado para quienes buscan un accesorio sofisticado y versátil. Su acabado en gamuza de alta calidad aporta un tacto suave y un look distinguido, ideal para cualquier ocasión.",
  desc2: "Cuenta con una correa arena ajustable, que añade un detalle refinado y permite un ajuste cómodo y seguro. Perfecto para complementar tanto outfits formales como casuales, convirtiéndose en un accesorio imprescindible para quienes valoran el estilo y la distinción."
},

"sombrero-trevisocamel": {
  nombre: "Sombrero Gamuza Treviso Camel",
  precio: "$180.000 COP",
  img1: "/Images/Productos/Sombreros/som04.avif",
  img2: "/Images/Productos/Sombreros/som04_.avif",
  img3: "/Images/Productos/Sombreros/som04__.avif",
  desc1: "Elegancia y estilo se unen en nuestro Sombrero Treviso de gamuza en color camel, diseñado para quienes buscan un accesorio sofisticado y versátil. Su acabado en gamuza de alta calidad aporta un tacto suave y un look distinguido, ideal para cualquier ocasión.",
  desc2: "Cuenta con una correa camel ajustable, que añade un detalle refinado y permite un ajuste cómodo y seguro. Perfecto para complementar tanto outfits formales como casuales, convirtiéndose en un accesorio imprescindible para quienes valoran el estilo y la distinción."
},

"sombrero-suavebrisa-rojo": {
  nombre: "Sombrero Suave Brisa Rojo",
  precio: "$180.000 COP",
  img1: "/Images/Productos/Sombreros/som05.avif",
  img2: "/Images/Productos/Sombreros/som05_.avif",
  img3: "/Images/Productos/Sombreros/som05__.avif",
  desc1: "Frescura y distinción se reflejan en nuestro Sombrero Suave Brisa en color rojo, una pieza pensada para quienes desean destacar con un accesorio lleno de carácter y personalidad. Su tono vibrante y elegante lo convierte en el complemento ideal para dar un toque único a tu estilo.",
  desc2: "Elaborado con materiales de alta calidad, ofrece un acabado impecable y un ajuste cómodo. Perfecto para realzar tanto looks casuales como atuendos más formales, este sombrero se convierte en un aliado indispensable para quienes buscan marcar tendencia con clase."
},

"sombrero-suavebrisa-rosado": {
  nombre: "Sombrero Suave Brisa Rosado",
  precio: "$180.000 COP",
  img1: "/Images/Productos/Sombreros/som06.avif",
  img2: "/Images/Productos/Sombreros/som06_.avif",
  img3: "/Images/Productos/Sombreros/som06__.avif",
  desc1: "Frescura y distinción se reflejan en nuestro Sombrero Suave Brisa en color rosado, una pieza pensada para quienes desean destacar con un accesorio lleno de carácter y personalidad. Su tono vibrante y elegante lo convierte en el complemento ideal para dar un toque único a tu estilo.",
  desc2: "Elaborado con materiales de alta calidad, ofrece un acabado impecable y un ajuste cómodo. Perfecto para realzar tanto looks casuales como atuendos más formales, este sombrero se convierte en un aliado indispensable para quienes buscan marcar tendencia con clase."
},

"sombrero-yute-camel": {
  nombre: "Sombrero Yute Camel",
  precio: "$180.000 COP",
  img1: "/Images/Productos/Sombreros/som07.avif",
  img2: "/Images/Productos/Sombreros/som07_.avif",
  img3: "/Images/Productos/Sombreros/som07__.avif",
  desc1: "Naturalidad y estilo se encuentran en nuestro Sombrero Yute Camel, diseñado para quienes aprecian un accesorio versátil y con carácter. Su tonalidad camel aporta calidez y sofisticación, convirtiéndolo en la elección ideal para acompañar cualquier ocasión.",
  desc2: "Confeccionado en yute de alta calidad, combina resistencia y frescura, garantizando comodidad durante todo el día. Perfecto para complementar tanto atuendos casuales como elegantes, este sombrero es el aliado ideal para quienes buscan un look distinguido con un toque auténtico."
},

"sombrero-yute-rustico": {
  nombre: "Sombrero Yute Rústico",
  precio: "$180.000 COP",
  img1: "/Images/Productos/Sombreros/som08.avif",
  img2: "/Images/Productos/Sombreros/som08_.avif",
  img3: "/Images/Productos/Sombreros/som08__.avif",
  desc1: "Autenticidad y carácter se reflejan en nuestro Sombrero Yute Rústico, pensado para quienes buscan un accesorio con esencia natural y un estilo atemporal. Su acabado en tono rústico resalta la nobleza del yute, ofreciendo un diseño único y lleno de personalidad.",
  desc2: "Elaborado con materiales resistentes y frescos, garantiza comodidad y durabilidad en cada uso. Ideal para acompañar tanto atuendos relajados como combinaciones más elegantes, este sombrero es la elección perfecta para quienes valoran la calidad y el estilo con un aire tradicional."
},

"sombrero-floryute-rosado": {
  nombre: "Sombrero Flor Yute Rosado",
  precio: "$180.000 COP",
  img1: "/Images/Productos/Sombreros/som09.avif",
  img2: "/Images/Productos/Sombreros/som09_.avif",
  img3: "/Images/Productos/Sombreros/som09__.avif",
  desc1: "Delicadeza y frescura se combinan en nuestro Sombrero Flor Yute Rosado, un accesorio diseñado para quienes desean resaltar su estilo con un toque sutil y femenino. Su tono rosado aporta luminosidad y encanto, convirtiéndolo en la pieza ideal para ocasiones especiales o looks casuales con distinción.",
  desc2: "Confeccionado en yute de alta calidad y decorado con detalle floral, ofrece un acabado único que une resistencia y elegancia. Perfecto para complementar atuendos ligeros y sofisticados, este sombrero es el aliado perfecto para quienes buscan elegancia natural con un aire romántico."
},

"sombrero-floryute-rojo": {
  nombre: "Sombrero Flor Yute Rojo",
  precio: "$180.000 COP",
  img1: "/Images/Productos/Sombreros/som10.avif",
  img2: "/Images/Productos/Sombreros/som10_.avif",
  img3: "/Images/Productos/Sombreros/som10__.avif",
  desc1: "Delicadeza y frescura se combinan en nuestro Sombrero Flor Yute Rojo, un accesorio diseñado para quienes desean resaltar su estilo con un toque sutil y femenino. Su tono rojo aporta luminosidad y encanto, convirtiéndolo en la pieza ideal para ocasiones especiales o looks casuales con distinción.",
  desc2: "Confeccionado en yute de alta calidad y decorado con detalle floral, ofrece un acabado único que une resistencia y elegancia. Perfecto para complementar atuendos ligeros y sofisticados, este sombrero es el aliado perfecto para quienes buscan elegancia natural con un aire romántico."
},

"sombrero-mielgraso-cafe": {
  nombre: "Sombrero Miel Graso Café",
  precio: "$180.000 COP",
  img1: "/Images/Productos/Sombreros/som11.avif",
  img2: "/Images/Productos/Sombreros/som11_.avif",
  img3: "/Images/Productos/Sombreros/som11__.avif",
  desc1: "Estilo vaquero y autenticidad se encuentran en nuestro Sombrero Miel Graso Café, diseñado para quienes buscan un accesorio con carácter y personalidad. Su tono café con matices cálidos aporta un aire clásico y versátil, ideal para destacar en cualquier ocasión.",
  desc2: "Fabricado con materiales de alta calidad, es más flexible y cómodo, lo que garantiza un ajuste perfecto y mayor facilidad de uso. Su diseño vaquero lo convierte en el complemento ideal tanto para looks casuales como para atuendos de estilo western, siendo un sombrero imprescindible para quienes valoran la distinción con un toque aventurero."
}
};

/* ============================================================================================================
                         DETECTOR DE PRODUCTOS JS
===============================================================================================================*/

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (productos[id]) {
  const p = productos[id];

  // Imagen principal
  const mainImg = document.querySelector(".main-image");
  if (mainImg) mainImg.src = p.img1;

  // Miniaturas
  const thumbs = document.querySelectorAll(".thumbnail");
  if (thumbs[0]) thumbs[0].src = p.img1;
  if (thumbs[1]) thumbs[1].src = p.img2;
  if (thumbs[2]) thumbs[2].src = p.img3;

  // Texto
  const nombre = document.querySelector(".producto");
  if (nombre) nombre.textContent = p.nombre;

  const precio = document.querySelector(".precio");
  if (precio) precio.textContent = p.precio;

  const descs = document.querySelectorAll(".descripcion");
  if (descs[0]) descs[0].textContent = p.desc1;
  if (descs[1]) descs[1].textContent = p.desc2;
}





