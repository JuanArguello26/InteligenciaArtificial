// Data Initialization
const INITIAL_PRODUCTS = [
    // HOMBRE - NICHO
    { id: 1, name: "Creed Aventus", price: 435, stock: 15, category: 'Hombre', type: 'Nicho', image: "https://images.unsplash.com/photo-1594035910387-fea477942698?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Parfums de Marly Herod", price: 320, stock: 8, category: 'Hombre', type: 'Nicho', image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Xerjoff Naxos", price: 250, stock: 12, category: 'Hombre', type: 'Nicho', image: "https://images.unsplash.com/photo-1523293182086-7651a899d60f?q=80&w=800&auto=format&fit=crop" },

    // HOMBRE - DISEÑADOR
    { id: 4, name: "Dior Sauvage Elixir", price: 180, stock: 50, category: 'Hombre', type: 'Diseñador', image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "Acqua di Gio Profondo", price: 140, stock: 40, category: 'Hombre', type: 'Diseñador', image: "https://images.unsplash.com/photo-1622618991746-fe6004db3fe9?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "Bleu de Chanel Parfum", price: 160, stock: 35, category: 'Hombre', type: 'Diseñador', image: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=800&auto=format&fit=crop" },

    // MUJER - NICHO
    { id: 7, name: "Baccarat Rouge 540", price: 325, stock: 10, category: 'Mujer', type: 'Nicho', image: "https://images.unsplash.com/photo-1595425239305-659f201041cf?q=80&w=800&auto=format&fit=crop" },
    { id: 8, name: "Delina Exclusif", price: 310, stock: 12, category: 'Mujer', type: 'Nicho', image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=800&auto=format&fit=crop" },
    { id: 9, name: "Amouage Guidance", price: 360, stock: 6, category: 'Mujer', type: 'Nicho', image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop" },

    // MUJER - DISEÑADOR
    { id: 10, name: "YSL Libre Intense", price: 150, stock: 60, category: 'Mujer', type: 'Diseñador', image: "https://images.unsplash.com/photo-1585232351009-1f4a364896d8?q=80&w=800&auto=format&fit=crop" },
    { id: 11, name: "Chanel Coco Mademoiselle", price: 135, stock: 45, category: 'Mujer', type: 'Diseñador', image: "https://images.unsplash.com/photo-1590736969955-71cc9480c713?q=80&w=800&auto=format&fit=crop" },
    { id: 12, name: "Prada Paradoxe", price: 120, stock: 55, category: 'Mujer', type: 'Diseñador', image: "https://images.unsplash.com/photo-1605367035411-dc5824907106?q=80&w=800&auto=format&fit=crop" }
];

// State Management
const State = {
    user: null, // 'admin' | 'owner' | 'client' | null
    products: loadProducts(),
    orders: JSON.parse(localStorage.getItem('orders')) || [],
    cart: []
};

// Data Loading Logic (Auto-Fix for outdated data)
function loadProducts() {
    const stored = JSON.parse(localStorage.getItem('products'));
    // If no data, or data is missing 'category' field (old version), reset.
    if (!stored || stored.length === 0 || !stored[0].category) {
        localStorage.setItem('products', JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
    }
    return stored;
}

// Utils
const saveState = () => {
    localStorage.setItem('products', JSON.stringify(State.products));
    localStorage.setItem('orders', JSON.stringify(State.orders));
};

const formatMoney = (amount) => `$${amount.toFixed(2)}`;

// Auth Logic
function login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');

    if (username === 'owner' && password === '1234') {
        State.user = 'owner';
        initApp();
    } else if (username === 'admin' && password === '1234') {
        State.user = 'admin';
        initApp();
    } else if (username === 'client' && password === '1234') {
        State.user = 'client';
        initApp();
    } else {
        errorMsg.textContent = "Credenciales incorrectas.";
        errorMsg.classList.remove('hidden');
        return;
    }
    document.getElementById('login-section').classList.add('hidden');
}

function logout() {
    State.user = null;
    State.cart = [];
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('login-error').classList.add('hidden');
    render();
}

// Rendering Logic
function initApp() {
    render();
}

function render() {
    const nav = document.getElementById('main-nav');
    const clientView = document.getElementById('client-view');
    const adminView = document.getElementById('admin-view');
    const navLinks = document.getElementById('nav-links');

    if (!State.user) return; // Stay on login

    if (State.user === 'owner') {
        clientView.classList.add('hidden');
        adminView.classList.remove('hidden');
        navLinks.innerHTML = `
            <span style="color: var(--primary-color); font-weight: bold; margin-right: 1rem;">Hola, Dueño</span>
            <button onclick="logout()" class="btn">Salir</button>
        `;
        renderAdminDashboard();
    } else if (State.user === 'admin') {
        clientView.classList.add('hidden');
        adminView.classList.remove('hidden');
        navLinks.innerHTML = `
            <span>Hola, Administrador</span>
            <button onclick="logout()" class="btn">Salir</button>
        `;
        renderAdminDashboard();
    } else {
        clientView.classList.remove('hidden');
        adminView.classList.add('hidden');
        navLinks.innerHTML = `
            <button class="btn" onclick="toggleCart()">Carrito (${State.cart.length})</button>
            <button onclick="logout()" class="btn">Salir</button>
        `;
        renderProducts();
        renderClientOrders();
    }
}

// Client Features
function renderProducts() {
    const container = document.getElementById('product-grid');
    container.innerHTML = ''; // Clear current content

    // Grouping
    const categories = ['Hombre', 'Mujer'];
    const types = ['Nicho', 'Diseñador'];

    categories.forEach(cat => {
        // Main Category Header
        const catHeader = document.createElement('h2');
        catHeader.className = 'category-header';
        catHeader.innerText = `Perfumes de ${cat}`;
        catHeader.style.cssText = "width: 100%; text-align: center; margin: 3rem 0 1rem; color: var(--primary-color); text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #333; padding-bottom: 0.5rem;";
        container.appendChild(catHeader);

        types.forEach(type => {
            const products = State.products.filter(p => p.category === cat && p.type === type);
            if (products.length === 0) return;

            // Sub-category Header
            const typeHeader = document.createElement('h3');
            typeHeader.innerText = `— Colección ${type} —`;
            typeHeader.style.cssText = "width: 100%; text-align: center; margin: 1.5rem 0 1rem; color: var(--text-muted); font-size: 1.1rem; font-style: italic;";
            container.appendChild(typeHeader);

            // Grid customized for this section
            const grid = document.createElement('div');
            grid.className = 'grid';
            grid.style.marginBottom = '2rem';

            grid.innerHTML = products.map(p => `
                <div class="card">
                    <img src="${p.image}" alt="${p.name}" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">${p.name}</h3>
                        <p class="card-price">${formatMoney(p.price)}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.9rem; color: ${p.stock > 0 ? 'var(--success-green)' : 'var(--accent-red)'}">
                                ${p.stock > 0 ? `Stock: ${p.stock}` : 'Agotado'}
                            </span>
                            <button class="btn btn-primary" 
                                onclick="addToCart(${p.id})" 
                                ${p.stock === 0 ? 'disabled' : ''}>
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            container.appendChild(grid);
        });
    });
}

function renderClientOrders() {
    const container = document.getElementById('client-orders');
    if (State.orders.length === 0) {
        container.innerHTML = "<p style='text-align:center; color: #666;'>No has realizado pedidos aún.</p>";
        return;
    }

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID Pedido</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${State.orders.map(o => `
                    <tr>
                        <td>#${o.id.toString().slice(-4)}</td>
                        <td>${o.date}</td>
                        <td>${formatMoney(o.total)}</td>
                        <td><span class="${o.status === 'Pendiente' ? 'status-pending' : 'status-completed'}">${o.status}</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function addToCart(id) {
    const product = State.products.find(p => p.id === id);
    if (product && product.stock > 0) {
        State.cart.push(product);
        render();
        alert(`${product.name} agregado al carrito`);
    }
}

function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('open');
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (State.cart.length === 0) {
        container.innerHTML = "<p>El carrito está vacío.</p>";
        totalEl.textContent = formatMoney(0);
        return;
    }

    const total = State.cart.reduce((sum, item) => sum + item.price, 0);
    totalEl.textContent = formatMoney(total);

    container.innerHTML = State.cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>${formatMoney(item.price)}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="margin-left:auto; color:red; border:none; background:none; cursor:pointer;">✕</button>
        </div>
    `).join('');
}

function removeFromCart(index) {
    State.cart.splice(index, 1);
    render();
    renderCart();
}

function checkout() {
    if (State.cart.length === 0) return;

    // Create Order
    const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        items: [...State.cart],
        total: State.cart.reduce((sum, i) => sum + i.price, 0),
        status: 'Pendiente'
    };

    // Deduct Stock
    State.cart.forEach(cartItem => {
        const product = State.products.find(p => p.id === cartItem.id);
        if (product) product.stock--;
    });

    State.orders.unshift(newOrder); // Add to beginning
    State.cart = [];
    saveState();

    toggleCart();
    render(); // Update UI
    renderClientOrders();
    alert("¡Pedido realizado con éxito!");
}

// Admin Features
function renderAdminDashboard() {
    const inventoryContainer = document.getElementById('admin-inventory');
    const ordersContainer = document.getElementById('admin-orders');

    // Inventory
    inventoryContainer.innerHTML = `
        <h3>Inventario General</h3>
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Tipo</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${State.products.map(p => `
                    <tr>
                        <td style="display:flex; align-items:center; gap:10px;">
                            <img src="${p.image}" style="width:30px; height:30px; object-fit:cover; border-radius:50%;">
                            ${p.name}
                        </td>
                        <td>${p.category}</td>
                        <td>${p.type}</td>
                        <td>${p.stock}</td>
                        <td>${formatMoney(p.price)}</td>
                        <td>
                            <button onclick="updateStock(${p.id}, 1)" class="btn" style="padding: 2px 8px;">+</button>
                            <button onclick="updateStock(${p.id}, -1)" class="btn" style="padding: 2px 8px;">-</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Orders
    ordersContainer.innerHTML = `
        <h3>Pedidos Recientes</h3>
        <table>
            <thead>
                <tr>
                    <th>ID Pedido</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Items</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${State.orders.map(o => `
                    <tr>
                        <td>#${o.id.toString().slice(-4)}</td>
                        <td>${o.date}</td>
                        <td>${formatMoney(o.total)}</td>
                        <td>${o.items.length} perfumes</td>
                        <td><span class="${o.status === 'Pendiente' ? 'status-pending' : 'status-completed'}">${o.status}</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function updateStock(id, change) {
    const product = State.products.find(p => p.id === id);
    if (product) {
        product.stock += change;
        if (product.stock < 0) product.stock = 0;
        saveState();
        renderAdminDashboard();
    }
}
