// ===== DATOS DE PRODUCTOS =====
const products = [
    {
        id: 1,
        name: "Suéter Elegante Rosa",
        category: "sueter",
        price: 24.99,
        description: "Suéter de punto suave perfecto para el invierno",
        images: ["img/prenda1_img1.png", "img/prenda1_img2.png", "img/prenda1_img3.png", "img/prenda1_img4.png", "img/prenda1_img5.png", "img/prenda1_img6.png"],
        arImage: "img/prenda1_img2.png"
    },
    {
        id: 2,
        name: "Suéter Corazones",
        category: "sueter",
        price: 26.99,
        description: "Diseño exclusivo con corazones bordados",
        images: ["img/prenda2_img1.png", "img/prenda2_img2.png", "img/prenda2_img3.png"],
        arImage: "img/prenda2_img3.png"
    },
    {
        id: 3,
        name: "Chaqueta Vaquera Chic",
        category: "chaqueta",
        price: 32.99,
        description: "Chaqueta vaquera con detalles exclusivos",
        images: ["img/prenda3_img1.png", "img/prenda3_img2.png", "img/prenda3_img3.png", "img/prenda3_img4.png", "img/prenda3_img5.png"]
    },
    {
        id: 4,
        name: "Collar Ajustable Elegante",
        category: "accesorio",
        price: 9.99,
        description: "Collar ajustable para ocasiones especiales",
        images: ["img/collar1_img1.png", "img/collar1_img2.png", "img/collar1_img3.png", "img/collar1_img4.png"],
        arImage: "img/collar1_img1.png"
    },
    {
        id: 5,
        name: "Chaqueta Moderna",
        category: "chaqueta",
        price: 28.99,
        description: "Chaqueta moderna con diseño único",
        images: ["img/prenda4_img1.png", "img/prenda4_img2.png", "img/prenda4_img3.png"]
    },
    {
        id: 6,
        name: "Abrigo Cálido",
        category: "chaqueta",
        price: 34.99,
        description: "Abrigo cálido para los días más fríos",
        images: ["img/prenda5_img1.png", "img/prenda5_img2.png", "img/prenda5_img3.png", "img/prenda5_img4.png"]
    },
    {
        id: 7,
        name: "Gorro Festivo Rosa",
        category: "accesorio",
        price: 12.99,
        description: "Gorro divertido y cómodo para tu gato",
        images: ["img/gorro1_img1.png", "img/gorro1_img2.png", "img/gorro1_img3.png"],
        arImage: "img/gorro1_img1.png"
    },
    {
        id: 8,
        name: "Gorro Navideño",
        category: "accesorio",
        price: 11.99,
        description: "Perfecto para celebraciones navideñas",
        images: ["img/gorro2_img1.png", "img/gorro2_img2.png", "img/gorro2_img3.png"],
        arImage: "img/gorro2_img3.png"
    },
    {
        id: 9,
        name: "Gorro Amarillo Alegre",
        category: "accesorio",
        price: 11.99,
        description: "Gorro colorido para tu felino",
        images: ["img/gorro3_img1.png", "img/gorro3_img2.png"],
        arImage: "img/gorro3_img2.png"
    },
    {
        id: 10,
        name: "Collar Premium",
        category: "accesorio",
        price: 8.99,
        description: "Collar de diseño exclusivo",
        images: ["img/collar2_img1.png", "img/collar2_img2.png", "img/collar2_img3.png"],
        arImage: "img/collar2_img3.png"
    },
    {
        id: 11,
        name: "Jersey Casual",
        category: "camiseta",
        price: 19.99,
        description: "Jersey cómodo para uso diario",
        images: ["img/prenda6_img1.png", "img/prenda6_img2.png", "img/prenda6_img3.png"],
        arImage: "img/prenda6_img3.png"
    }
];

// ===== VARIABLES GLOBALES =====
let cart = [];
let selectedProduct = null;
let uploadedCatImage = null;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    loadProducts();
    initFilters();
    initARTool();
    initForms();
    initScrollAnimations();
    initCarouselDots();
});

// ===== NAVEGACIÓN =====
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú móvil
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');

            // Cerrar menú móvil
            navMenu.classList.remove('active');

            // Scroll suave
            if (target.startsWith('#')) {
                scrollToSection(target.substring(1));
            }
        });
    });

    // Sticky header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });

    // Highlight active section
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== PRODUCTOS =====
function loadProducts() {
    // Cargar productos destacados
    const carousel = document.getElementById('productsCarousel');
    const featuredProducts = products.slice(0, 4);

    carousel.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');

    // Cargar todos los productos en el catálogo
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => createProductCard(product)).join('');

    // Cargar productos para AR (solo productos específicos)
    const arList = document.getElementById('arProductsList');
    const arProductIds = [1, 4, 10, 9, 8, 2, 11]; // IDs de productos con imágenes AR específicas
    const arProducts = products.filter(p => arProductIds.includes(p.id));
    arList.innerHTML = arProducts.map(product => `
        <div class="ar-product-item" data-product-id="${product.id}">
            <img src="${product.arImage || product.images[0]}" alt="${product.name}" loading="lazy">
        </div>
    `).join('');

    // Event listeners para productos AR
    document.querySelectorAll('.ar-product-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.ar-product-item').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            const productId = parseInt(this.dataset.productId);
            selectARProduct(productId);
        });
    });
}

function createProductCard(product) {
    const carouselId = `carousel-${product.id}`;
    const dotsHtml = product.images.map((_, index) =>
        `<span class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`
    ).join('');

    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image-carousel" id="${carouselId}">
                <div class="carousel-images">
                    ${product.images.map((img, index) =>
        `<img src="${img}" alt="${product.name}" class="carousel-image ${index === 0 ? 'active' : ''}" loading="lazy">`
    ).join('')}
                </div>
                ${product.images.length > 1 ? `
                    <button class="carousel-btn prev" onclick="changeImage('${carouselId}', -1)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="carousel-btn next" onclick="changeImage('${carouselId}', 1)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <div class="carousel-dots">
                        ${dotsHtml}
                    </div>
                ` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price.toFixed(2)}€</div>
                <div class="product-actions">
                    <button class="btn btn-secondary" onclick="tryWithAR(${product.id})">
                        <i class="fas fa-vr-cardboard"></i> Probar AR
                    </button>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Comprar
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getProductIcon(category) {
    const icons = {
        'sueter': 'fas fa-mitten',
        'camiseta': 'fas fa-tshirt',
        'chaqueta': 'fas fa-vest',
        'accesorio': 'fas fa-hat-cowboy'
    };
    return icons[category] || 'fas fa-tshirt';
}

// ===== CARRUSEL DE IMÁGENES =====
function changeImage(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const images = carousel.querySelectorAll('.carousel-image');
    const dots = carousel.querySelectorAll('.carousel-dot');

    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));

    // Remover active de la imagen actual
    images[currentIndex].classList.remove('active');
    if (dots.length > 0) {
        dots[currentIndex].classList.remove('active');
    }

    // Calcular nuevo índice
    currentIndex = (currentIndex + direction + images.length) % images.length;

    // Agregar active a la nueva imagen
    images[currentIndex].classList.add('active');
    if (dots.length > 0) {
        dots[currentIndex].classList.add('active');
    }
}

function initCarouselDots() {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('carousel-dot')) {
            const carousel = e.target.closest('.product-image-carousel');
            const images = carousel.querySelectorAll('.carousel-image');
            const dots = carousel.querySelectorAll('.carousel-dot');
            const targetIndex = parseInt(e.target.dataset.index);

            // Remover active de todos
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Agregar active al seleccionado
            images[targetIndex].classList.add('active');
            dots[targetIndex].classList.add('active');
        }
    });
}

// ===== FILTROS =====
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrar productos
            const filter = this.dataset.filter;
            filterProducts(filter);
        });
    });
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===== CARRITO =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Buscar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        updateCartDisplay();
        showNotification(`${product.name} añadido al carrito`);
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCount.textContent = totalItems;

    // Animación
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        cartSummary.style.display = 'none';
        return;
    }

    // Mostrar items del carrito
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.images[0]}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toFixed(2)}€</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Calcular totales
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 30 ? 0 : 4.99;
    const total = subtotal + shipping;

    document.getElementById('cartSubtotal').textContent = `€${subtotal.toFixed(2)}`;
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'GRATIS' : `€${shipping.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `€${total.toFixed(2)}`;

    cartSummary.style.display = 'block';
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
    showNotification('Producto eliminado del carrito');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    showNotification('¡Gracias por tu compra! Esta es una simulación. En un sitio real, aquí procesaríamos el pago.');
    cart = [];
    updateCartCount();
    updateCartDisplay();
    closeCart();
}

// ===== MODALES =====
function openCart() {
    updateCartDisplay();
    const modal = document.getElementById('cartModal');
    modal.classList.add('active');
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.remove('active');
}

function openLogin() {
    const modal = document.getElementById('loginModal');
    modal.classList.add('active');
}

function closeLogin() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('active');
}

function openRegister() {
    const modal = document.getElementById('registerModal');
    modal.classList.add('active');
}

function closeRegister() {
    const modal = document.getElementById('registerModal');
    modal.classList.remove('active');
}

function switchToRegister(event) {
    event.preventDefault();
    closeLogin();
    setTimeout(() => openRegister(), 200);
}

function switchToLogin(event) {
    event.preventDefault();
    closeRegister();
    setTimeout(() => openLogin(), 200);
}

// Cerrar modales al hacer clic fuera
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// Event listeners para botones del header
document.addEventListener('DOMContentLoaded', function() {
    // Botón del carrito
    document.querySelector('.cart-btn').addEventListener('click', openCart);
    
    // Botón de usuario (abrir login)
    const userBtns = document.querySelectorAll('.icon-btn');
    userBtns.forEach(btn => {
        if (btn.querySelector('.fa-user')) {
            btn.addEventListener('click', openLogin);
        }
    });
});

// ===== FORMULARIOS DE AUTENTICACIÓN =====
function initAuthForms() {
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        console.log('Login:', { email, password });
        showNotification('¡Bienvenido! (Esta es una simulación, no se guardan datos reales)');
        loginForm.reset();
        closeLogin();
    });

    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
        
        // Validación básica
        if (password.length < 6) {
            showNotification('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        
        if (password !== passwordConfirm) {
            showNotification('Las contraseñas no coinciden');
            return;
        }
        
        console.log('Registro:', { name, email, password });
        showNotification('¡Cuenta creada exitosamente! (Esta es una simulación)');
        registerForm.reset();
        closeRegister();
        setTimeout(() => openLogin(), 500);
    });
}

// Llamar a initAuthForms en la inicialización
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    loadProducts();
    initFilters();
    initARTool();
    initForms();
    initAuthForms();
    initScrollAnimations();
    initCarouselDots();
});

// ===== PROBADOR AR =====
function initARTool() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('catPhoto');
    const uploadedImage = document.getElementById('uploadedImage');
    const tryAnotherBtn = document.getElementById('tryAnother');
    const addToCartBtn = document.getElementById('addToCart');

    // Click en área de carga
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#FF69B4';
        uploadArea.style.background = '#FFB6C1';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#FFB6C1';
        uploadArea.style.background = '#FFF0F5';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#FFB6C1';
        uploadArea.style.background = '#FFF0F5';

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });

    // Selección de archivo
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    // Probar otra prenda
    tryAnotherBtn.addEventListener('click', () => {
        document.querySelectorAll('.ar-product-item').forEach(i => i.classList.remove('selected'));
        selectedProduct = null;
        updateARResult();
    });

    // Añadir al carrito desde AR
    addToCartBtn.addEventListener('click', () => {
        if (selectedProduct) {
            addToCart(selectedProduct);
        }
    });
}

function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedCatImage = e.target.result;
        const uploadedImage = document.getElementById('uploadedImage');
        const uploadArea = document.getElementById('uploadArea');

        uploadedImage.src = uploadedCatImage;
        uploadedImage.classList.add('active');
        uploadArea.style.display = 'none';

        showNotification('¡Foto cargada! Ahora selecciona una prenda');
    };
    reader.readAsDataURL(file);
}

function selectARProduct(productId) {
    selectedProduct = productId;
    updateARResult();
}

function updateARResult() {
    const resultDisplay = document.getElementById('resultDisplay');

    if (uploadedCatImage && selectedProduct) {
        const product = products.find(p => p.id === selectedProduct);
        resultDisplay.innerHTML = `
            <div style="text-align: center;">
                <img src="${uploadedCatImage}" style="max-width: 100%; border-radius: 15px; margin-bottom: 1rem;">
                <div style="background: #FFB6C1; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem;">
                    <i class="fas fa-magic"></i>
                    <p style="margin: 0.5rem 0 0 0; font-weight: bold;">Vista previa con ${product.name}</p>
                    <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.9;">Simulación de realidad aumentada</p>
                </div>
            </div>
        `;
    } else {
        resultDisplay.innerHTML = '<p class="result-placeholder">El resultado aparecerá aquí</p>';
    }
}

function tryWithAR(productId) {
    scrollToSection('probador-ar');
    setTimeout(() => {
        const productItem = document.querySelector(`[data-product-id="${productId}"]`);
        if (productItem) {
            productItem.click();
        }
    }, 500);
}

// ===== FORMULARIOS =====
function initForms() {
    // Formulario de asesoría
    const asesoriaForm = document.getElementById('asesoriaForm');
    asesoriaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            fecha: document.getElementById('fecha').value,
            motivo: document.getElementById('motivo').value
        };

        console.log('Solicitud de cita:', formData);
        showNotification('¡Solicitud enviada! Te contactaremos pronto para confirmar tu cita.');
        asesoriaForm.reset();
    });

    // Formulario newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        console.log('Suscripción newsletter:', email);
        showNotification('¡Gracias por suscribirte! Recibirás nuestras novedades.');
        newsletterForm.reset();
    });
}

// ===== NOTIFICACIONES =====
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    // Estilos
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #2C2C2C;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .product-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// ===== ANIMACIONES AL SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animateElements = document.querySelectorAll('.benefit-card, .product-card, .value, .process-step');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== UTILIDADES =====
window.scrollToSection = scrollToSection;
window.addToCart = addToCart;
window.tryWithAR = tryWithAR;
window.changeImage = changeImage;
window.openCart = openCart;
window.closeCart = closeCart;
window.openLogin = openLogin;
window.closeLogin = closeLogin;
window.openRegister = openRegister;
window.closeRegister = closeRegister;
window.switchToLogin = switchToLogin;
window.switchToRegister = switchToRegister;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;

console.log('Felinique cargado correctamente ✨');
