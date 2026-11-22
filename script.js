/*
  Oak & Home
  A beginner furniture-store demo made with plain JavaScript.

  The page keeps products, users, orders, and the cart in arrays.
  Functions draw those arrays into the HTML.
  localStorage saves the arrays in this browser only.

  This is a student project, not a real shop.
*/

// These names must match the category dropdowns in index.html.
var CATEGORIES = ["Living Room", "Bedroom", "Dining", "Office"];

var ADMIN_EMAIL = "admin@oakandhome.test";
var ADMIN_PASSWORD = "admin123";

var KEYS = {
  products: "oakhome_products",
  users: "oakhome_users",
  orders: "oakhome_orders",
  cart: "oakhome_cart",
  session: "oakhome_session"
};

// Sample furniture used the first time the page opens, or if saved data is unusable.
var DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Oak Lounge Sofa",
    category: "Living Room",
    price: 42900,
    description: "A deep three-seat sofa in natural oak and soft oatmeal fabric. Built for movie nights and long conversations.",
    stock: 4,
    emoji: "🛋️",
    reviews: [
      { id: "r1", userName: "Mira", userEmail: "mira@example.com", rating: 5, comment: "The oak frame feels solid and the seat is easy to sink into.", date: "12 Oct 2026" },
      { id: "r2", userName: "Arun", userEmail: "arun@example.com", rating: 4, comment: "Comfortable, though it is a large piece for a small room.", date: "2 Nov 2026" }
    ]
  },
  {
    id: "p2",
    name: "Walnut Coffee Table",
    category: "Living Room",
    price: 8900,
    description: "A low walnut table with a lower shelf for books, trays, and a spare blanket.",
    stock: 8,
    emoji: "🪵",
    reviews: [
      { id: "r3", userName: "Leela", userEmail: "leela@example.com", rating: 5, comment: "The shelf underneath is more useful than I expected.", date: "20 Sep 2026" },
      { id: "r4", userName: "Kabir", userEmail: "kabir@example.com", rating: 4, comment: "Sturdy walnut top. Easy to wipe after tea.", date: "8 Oct 2026" },
      { id: "r5", userName: "Nora", userEmail: "nora@example.com", rating: 4, comment: "Looks warm next to a light sofa.", date: "18 Oct 2026" }
    ]
  },
  {
    id: "p3",
    name: "Linen Reading Chair",
    category: "Living Room",
    price: 12400,
    description: "A high-back chair in stone linen with slim oak legs. Light enough to move near a window.",
    stock: 2,
    emoji: "🪑",
    reviews: [
      { id: "r6", userName: "Sara", userEmail: "sara@example.com", rating: 5, comment: "My favourite seat for reading in the evening.", date: "5 Oct 2026" }
    ]
  },
  {
    id: "p4",
    name: "Maple Platform Bed",
    category: "Bedroom",
    price: 38900,
    description: "A low maple bed frame with a padded headboard. Fits a standard queen mattress, which is not included.",
    stock: 3,
    emoji: "🛏️",
    reviews: [
      { id: "r7", userName: "Dev", userEmail: "dev@example.com", rating: 4, comment: "Simple shape and the headboard is soft.", date: "11 Sep 2026" },
      { id: "r8", userName: "Aisha", userEmail: "aisha@example.com", rating: 4, comment: "Easy to assemble with two people.", date: "29 Oct 2026" }
    ]
  },
  {
    id: "p5",
    name: "Oak Bedside Table",
    category: "Bedroom",
    price: 5400,
    description: "One small oak table with a drawer and an open shelf for a book and a lamp.",
    stock: 10,
    emoji: "🌙",
    reviews: [
      { id: "r9", userName: "Ravi", userEmail: "ravi@example.com", rating: 3, comment: "Nice wood, but the drawer is quite shallow.", date: "3 Aug 2026" }
    ]
  },
  {
    id: "p6",
    name: "Family Dining Table",
    category: "Dining",
    price: 27500,
    description: "A rectangular oak dining table that seats six. The top has a smooth, easy-clean finish.",
    stock: 4,
    emoji: "🍽️",
    reviews: [
      { id: "r10", userName: "Meera", userEmail: "meera@example.com", rating: 5, comment: "We use it every day and the oak still looks calm and bright.", date: "16 Oct 2026" },
      { id: "r11", userName: "Jon", userEmail: "jon@example.com", rating: 5, comment: "Plenty of room for six plates without feeling crowded.", date: "1 Nov 2026" }
    ]
  },
  {
    id: "p7",
    name: "Dining Chair Pair",
    category: "Dining",
    price: 9800,
    description: "A set of two oak dining chairs with woven seats. Order more than one set for a full table.",
    stock: 7,
    emoji: "🪑",
    reviews: [
      { id: "r12", userName: "Priya", userEmail: "priya@example.com", rating: 4, comment: "The woven seats are comfortable for a long lunch.", date: "9 Sep 2026" }
    ]
  },
  {
    id: "p8",
    name: "Writer's Study Desk",
    category: "Office",
    price: 15600,
    description: "A compact oak desk with one drawer and a cable gap. Deep enough for a laptop and a notebook.",
    stock: 5,
    emoji: "🖥️",
    reviews: [
      { id: "r13", userName: "Neil", userEmail: "neil@example.com", rating: 5, comment: "The cable gap keeps the charger off the floor.", date: "22 Oct 2026" },
      { id: "r14", userName: "Hana", userEmail: "hana@example.com", rating: 4, comment: "A good size for a small bedroom office.", date: "28 Oct 2026" }
    ]
  },
  {
    id: "p9",
    name: "Tall Oak Bookshelf",
    category: "Office",
    price: 11200,
    description: "Five open shelves for books, photos, and a small plant. Anchor it to a wall when you set it up.",
    stock: 6,
    emoji: "📚",
    reviews: [
      { id: "r15", userName: "Omar", userEmail: "omar@example.com", rating: 4, comment: "Holds a lot of books and looks lighter than a closed cupboard.", date: "14 Sep 2026" },
      { id: "r16", userName: "Diya", userEmail: "diya@example.com", rating: 3, comment: "Pretty shelves. Remember to fix it to the wall.", date: "19 Oct 2026" }
    ]
  },
  {
    id: "p10",
    name: "Support Office Chair",
    category: "Office",
    price: 8700,
    description: "A cushioned desk chair with a simple oak base and an adjustable height.",
    stock: 9,
    emoji: "💺",
    reviews: []
  }
];

// Values the page can change while the student is using it.
var products = [];
var users = [];
var orders = [];
var cart = [];
var currentUser = null;
var currentProductId = null;
var editingProductId = null;
var searchText = "";
var activeCategory = "All";
var sortBy = "featured";
var showingConfirmation = false;
var storageProblem = false;
var placingOrder = false;
var idCounter = Date.now();
var toastTimer = null;

// Builds an id such as p-1730000001 so each new item is unique in this demo.
function makeId(prefix) {
  idCounter = idCounter + 1;
  return prefix + "-" + idCounter;
}

// Makes a separate copy so later edits do not change the original sample list.
function copyData(value) {
  return JSON.parse(JSON.stringify(value));
}

// localStorage note:
// This saves data only in the current browser on this computer.
// It is NOT secure, and it is NOT shared between users or devices.
// Anyone who can open this browser can read or edit the saved data.
// A real shop would use a server and would never store plain-text passwords.
function readStorage(key) {
  try {
    var raw = localStorage.getItem(key);
    if (raw === null || raw.trim() === "") {
      return null;
    }
    return JSON.parse(raw);
  } catch (error) {
    storageProblem = true;
    return null;
  }
}

function writeStorage(key, value) {
  try {
    if (value === null) {
      localStorage.removeItem(key);
      return true;
    }
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    showToast("Could not save in this browser. The latest change may disappear after a refresh.", "error");
    return false;
  }
}

function saveProducts() {
  writeStorage(KEYS.products, products);
}

function saveUsers() {
  writeStorage(KEYS.users, users);
}

function saveOrders() {
  writeStorage(KEYS.orders, orders);
}

function saveCart() {
  writeStorage(KEYS.cart, cart);
}

function saveSession() {
  if (currentUser) {
    writeStorage(KEYS.session, currentUser);
  } else {
    writeStorage(KEYS.session, null);
  }
}

// Creates an element, adds a class, and sets its text.
// Buttons are type="button" so they do not accidentally submit a form.
function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (typeof text === "string") {
    node.textContent = text;
  }
  if (tag === "button") {
    node.type = "button";
  }
  return node;
}

// If the click lands on text or a span inside a button, walk up to the button.
function findButton(target) {
  var node = target;
  while (node && node.tagName !== "BUTTON") {
    node = node.parentNode;
  }
  return node;
}

function formatPrice(amount) {
  var rounded = Math.round(amount);
  return "₹" + rounded.toLocaleString("en-IN");
}

function findProduct(id) {
  var i;
  for (i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

function findUser(email) {
  var wanted = String(email).trim().toLowerCase();
  var i;
  for (i = 0; i < users.length; i++) {
    if (users[i].email === wanted) {
      return users[i];
    }
  }
  return null;
}

function publicUser(user) {
  return {
    name: user.name,
    email: user.email,
    role: user.role
  };
}

function emojiForCategory(category) {
  if (category === "Living Room") return "🛋️";
  if (category === "Bedroom") return "🛏️";
  if (category === "Dining") return "🍽️";
  if (category === "Office") return "💼";
  return "🪑";
}

function categoryClass(category) {
  if (category === "Living Room") return "tone-living";
  if (category === "Bedroom") return "tone-bed";
  if (category === "Dining") return "tone-dining";
  if (category === "Office") return "tone-office";
  return "tone-living";
}

function requireAdmin() {
  return currentUser !== null && currentUser.role === "admin";
}

// Checks for text before @, a dot after the @, and no spaces.
function isValidEmail(email) {
  var at = email.indexOf("@");
  var dot = email.lastIndexOf(".");
  if (email.indexOf(" ") !== -1) return false;
  if (at < 1) return false;
  if (dot < at + 2) return false;
  if (dot >= email.length - 1) return false;
  return true;
}

// Keeps only the number characters from a phone field.
function digitsOnly(text) {
  var digits = "";
  var i;
  for (i = 0; i < text.length; i++) {
    var character = text.charAt(i);
    if (character >= "0" && character <= "9") {
      digits = digits + character;
    }
  }
  return digits;
}

function showFormMessage(id, text, type) {
  var node = document.getElementById(id);
  node.textContent = text;
  if (!text) {
    node.className = "form-message";
    node.setAttribute("role", "status");
    return;
  }
  node.className = "form-message " + type;
  node.setAttribute("role", type === "error" ? "alert" : "status");
}

function setInvalid(input) {
  input.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
}

function clearInvalid(form) {
  var fields = form.querySelectorAll(".invalid");
  var i;
  for (i = 0; i < fields.length; i++) {
    fields[i].classList.remove("invalid");
    fields[i].removeAttribute("aria-invalid");
  }
}

function showToast(message, type) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast " + type;
  toast.setAttribute("role", type === "error" ? "alert" : "status");
  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(function () {
    toast.hidden = true;
  }, 3800);
}

function normalizeProduct(item) {
  var price;
  var stock;
  var reviews;
  var i;
  if (!item || typeof item.id !== "string" || item.id.trim() === "") return null;
  if (typeof item.name !== "string" || item.name.trim() === "") return null;
  if (typeof item.category !== "string" || item.category.trim() === "") return null;
  price = Number(item.price);
  stock = Number(item.stock);
  if (!Number.isFinite(price) || price <= 0) return null;
  if (!Number.isFinite(stock) || stock < 0) return null;

  reviews = [];
  if (Array.isArray(item.reviews)) {
    for (i = 0; i < item.reviews.length; i++) {
      var review = item.reviews[i];
      var rating = review ? Number(review.rating) : NaN;
      if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        continue;
      }
      reviews.push({
        id: typeof review.id === "string" ? review.id : makeId("r"),
        userName: typeof review.userName === "string" && review.userName.trim() !== "" ? review.userName : "Customer",
        userEmail: typeof review.userEmail === "string" ? review.userEmail.toLowerCase() : "",
        rating: rating,
        comment: typeof review.comment === "string" ? review.comment : "",
        date: typeof review.date === "string" ? review.date : ""
      });
    }
  }

  return {
    id: item.id.trim(),
    name: item.name.trim(),
    category: item.category.trim(),
    price: Math.round(price),
    description: typeof item.description === "string" ? item.description.trim() : "",
    stock: Math.round(stock),
    emoji: typeof item.emoji === "string" && item.emoji !== "" ? item.emoji : emojiForCategory(item.category),
    reviews: reviews
  };
}

// Loads the catalogue. A missing save uses the samples. Broken data uses the samples too.
function loadProducts() {
  var saved = readStorage(KEYS.products);
  var clean = [];
  var i;
  if (saved === null) {
    return copyData(DEFAULT_PRODUCTS);
  }
  if (!Array.isArray(saved)) {
    storageProblem = true;
    return copyData(DEFAULT_PRODUCTS);
  }
  for (i = 0; i < saved.length; i++) {
    var product = normalizeProduct(saved[i]);
    if (product) {
      clean.push(product);
    }
  }
  if (saved.length > 0 && clean.length === 0) {
    storageProblem = true;
    return copyData(DEFAULT_PRODUCTS);
  }
  return clean;
}

function normalizeUser(item) {
  var email;
  var role;
  if (!item || typeof item.email !== "string") return null;
  if (typeof item.name !== "string" || item.name.trim() === "") return null;
  if (typeof item.password !== "string" || item.password === "") return null;
  email = item.email.trim().toLowerCase();
  if (email.indexOf("@") === -1) return null;
  // Only the known demo email can be an admin, even if saved data says otherwise.
  role = email === ADMIN_EMAIL ? "admin" : "customer";
  return {
    name: item.name.trim(),
    email: email,
    password: item.password,
    role: role
  };
}

function ensureDemoAdmin(list) {
  var admin = {
    name: "Demo Admin",
    email: ADMIN_EMAIL,
    // The printed password is put back on each load so the class demo login keeps working.
    password: ADMIN_PASSWORD,
    role: "admin"
  };
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].email === ADMIN_EMAIL) {
      list[i].password = ADMIN_PASSWORD;
      list[i].role = "admin";
      if (!list[i].name) {
        list[i].name = admin.name;
      }
      return;
    }
  }
  list.unshift(admin);
}

function loadUsers() {
  var saved = readStorage(KEYS.users);
  var list = [];
  var i;
  if (Array.isArray(saved)) {
    for (i = 0; i < saved.length; i++) {
      var user = normalizeUser(saved[i]);
      if (user) {
        list.push(user);
      }
    }
    if (saved.length > 0 && list.length === 0) {
      storageProblem = true;
    }
  } else if (saved !== null) {
    storageProblem = true;
  }
  ensureDemoAdmin(list);
  return list;
}

function loadOrders() {
  var saved = readStorage(KEYS.orders);
  var clean = [];
  var i;
  if (saved === null) {
    return [];
  }
  if (!Array.isArray(saved)) {
    storageProblem = true;
    return [];
  }
  for (i = 0; i < saved.length; i++) {
    var order = saved[i];
    if (!order || typeof order.orderNumber !== "string") continue;
    if (!Array.isArray(order.items)) continue;
    clean.push(order);
  }
  if (saved.length > 0 && clean.length === 0) {
    storageProblem = true;
  }
  return clean;
}

function loadCart() {
  var saved = readStorage(KEYS.cart);
  var clean = [];
  var i;
  if (saved === null) {
    return [];
  }
  if (!Array.isArray(saved)) {
    storageProblem = true;
    return [];
  }
  for (i = 0; i < saved.length; i++) {
    var item = saved[i];
    var quantity = item ? Number(item.quantity) : NaN;
    if (!item || typeof item.productId !== "string") continue;
    if (!Number.isFinite(quantity)) continue;
    clean.push({ productId: item.productId, quantity: quantity });
  }
  if (saved.length > 0 && clean.length === 0) {
    storageProblem = true;
  }
  return clean;
}

function loadCurrentUser() {
  var saved = readStorage(KEYS.session);
  var user;
  if (saved === null) {
    return null;
  }
  if (!saved || typeof saved.email !== "string") {
    storageProblem = true;
    return null;
  }
  user = findUser(saved.email);
  if (!user) {
    return null;
  }
  return publicUser(user);
}

// Drops missing products and keeps quantities inside the current stock.
function sanitizeCart() {
  var next = [];
  var changed = false;
  var i;
  for (i = 0; i < cart.length; i++) {
    var product = findProduct(cart[i].productId);
    var quantity = Math.floor(Number(cart[i].quantity));
    if (!product || product.stock < 1 || !Number.isFinite(quantity) || quantity < 1) {
      changed = true;
      continue;
    }
    if (quantity > product.stock) {
      quantity = product.stock;
      changed = true;
    }
    if (quantity !== cart[i].quantity) {
      changed = true;
    }
    next.push({ productId: product.id, quantity: quantity });
  }
  if (next.length !== cart.length) {
    changed = true;
  }
  cart = next;
  return changed;
}

// The average is calculated from the reviews every time we draw a product.
function getValidReviews(product) {
  var source = product.reviews || [];
  var valid = [];
  var i;
  for (i = 0; i < source.length; i++) {
    var review = source[i];
    var rating = review ? Number(review.rating) : NaN;
    if (Number.isFinite(rating) && rating >= 1 && rating <= 5) {
      valid.push(review);
    }
  }
  return valid;
}

function getAverageRating(product) {
  var reviews = getValidReviews(product);
  var sum = 0;
  var i;
  if (reviews.length === 0) {
    return 0;
  }
  for (i = 0; i < reviews.length; i++) {
    sum = sum + Number(reviews[i].rating);
  }
  return sum / reviews.length;
}

function createStars(ratingValue) {
  // Round to the nearest star for the symbols. The number beside them is the exact average.
  var wrap = el("span", "stars");
  var rounded = Math.round(ratingValue);
  var symbols = "";
  var i;
  wrap.setAttribute("aria-hidden", "true");
  for (i = 1; i <= 5; i++) {
    if (i <= rounded) {
      symbols = symbols + "★";
    } else {
      symbols = symbols + "☆";
    }
  }
  wrap.textContent = symbols;
  return wrap;
}

function createRatingLine(product) {
  var wrap = el("p", "rating-line");
  var reviews = getValidReviews(product);
  var average = getAverageRating(product);
  if (reviews.length === 0) {
    wrap.textContent = "No reviews yet";
    return wrap;
  }
  wrap.appendChild(createStars(average));
  wrap.appendChild(document.createTextNode(
    " " + average.toFixed(1) + " (" + reviews.length + (reviews.length === 1 ? " review)" : " reviews)")
  ));
  return wrap;
}

function hasUserReviewed(product) {
  var reviews;
  var i;
  if (!currentUser) {
    return false;
  }
  reviews = product.reviews || [];
  for (i = 0; i < reviews.length; i++) {
    if (reviews[i].userEmail && reviews[i].userEmail.toLowerCase() === currentUser.email) {
      return true;
    }
  }
  return false;
}

// Search, category filter, and sort. Featured keeps the saved list order.
function getVisibleProducts() {
  var term = searchText.trim().toLowerCase();
  var matches = [];
  var i;
  for (i = 0; i < products.length; i++) {
    var product = products[i];
    var categoryMatches = activeCategory === "All" || product.category === activeCategory;
    var searchable = (product.name + " " + product.description).toLowerCase();
    var textMatches = term === "" || searchable.indexOf(term) !== -1;
    if (categoryMatches && textMatches) {
      matches.push(product);
    }
  }
  matches.sort(compareProducts);
  return matches;
}

function compareProducts(a, b) {
  if (sortBy === "price-asc") return a.price - b.price;
  if (sortBy === "price-desc") return b.price - a.price;
  if (sortBy === "rating") return getAverageRating(b) - getAverageRating(a);
  return 0;
}

function createProductCard(product) {
  var card = el("article", "product-card");
  var visual = el("div", "product-visual " + categoryClass(product.category));
  var body = el("div", "product-body");
  var stock = el("p", product.stock > 0 ? "stock" : "stock out");
  var actions = el("div", "card-actions");
  var viewButton = el("button", "btn btn-secondary", "View details");
  var addButton = el("button", "btn btn-primary", "Add to cart");

  visual.setAttribute("aria-hidden", "true");
  visual.appendChild(el("span", "product-emoji", product.emoji || "🪑"));

  stock.textContent = product.stock > 0 ? product.stock + " in stock" : "Out of stock";

  viewButton.setAttribute("data-action", "view");
  viewButton.setAttribute("data-id", product.id);
  addButton.setAttribute("data-action", "add");
  addButton.setAttribute("data-id", product.id);
  if (product.stock < 1) {
    addButton.disabled = true;
  }

  actions.appendChild(viewButton);
  actions.appendChild(addButton);

  body.appendChild(el("p", "eyebrow", product.category));
  body.appendChild(el("h3", null, product.name));
  body.appendChild(el("p", "card-description", product.description));
  body.appendChild(el("p", "price", formatPrice(product.price)));
  body.appendChild(createRatingLine(product));
  body.appendChild(stock);
  body.appendChild(actions);

  card.appendChild(visual);
  card.appendChild(body);
  return card;
}

// Draws the product cards that match the current search, filter, and sort.
function renderProducts() {
  var list = document.getElementById("product-list");
  var empty = document.getElementById("empty-results");
  var count = document.getElementById("results-count");
  var visible = getVisibleProducts();
  var i;

  list.innerHTML = "";

  if (products.length === 0) {
    count.textContent = "0 items";
    empty.hidden = false;
    empty.textContent = "The catalogue is empty. Sign in as the demo admin to add a product.";
    return;
  }

  count.textContent = visible.length + (visible.length === 1 ? " item" : " items");

  if (visible.length === 0) {
    empty.hidden = false;
    empty.textContent = "No furniture matches your search. Try another word, category, or the Reset button.";
    return;
  }

  empty.hidden = true;
  for (i = 0; i < visible.length; i++) {
    list.appendChild(createProductCard(visible[i]));
  }
}

function createReviewList(product) {
  var reviews = getValidReviews(product);
  var list;
  var i;
  if (reviews.length === 0) {
    return el("p", "empty-state", "No reviews yet. Be the first to share what you think.");
  }
  list = document.createElement("ul");
  list.className = "review-list";
  for (i = 0; i < reviews.length; i++) {
    var review = reviews[i];
    var item = document.createElement("li");
    var meta = review.userName + " · " + review.rating + "/5";
    item.className = "review-item";
    if (review.date) {
      meta = meta + " · " + review.date;
    }
    item.appendChild(el("p", "review-meta", meta));
    item.appendChild(el("p", null, review.comment));
    list.appendChild(item);
  }
  return list;
}

function createReviewForm(product) {
  var wrap = el("div", "panel review-panel");
  var form;
  var fieldset;
  var legend;
  var star;
  var field;
  var label;
  var textarea;
  var message;
  var submit;
  var loginButton;

  wrap.appendChild(el("h3", null, "Write a review"));

  if (!currentUser) {
    wrap.appendChild(el("p", null, "Log in with a demo account to leave a star rating and a short comment."));
    loginButton = el("button", "btn btn-secondary", "Go to log in");
    loginButton.id = "go-to-login";
    wrap.appendChild(loginButton);
    return wrap;
  }

  if (hasUserReviewed(product)) {
    wrap.appendChild(el("p", null, "You already reviewed this product. The average rating includes your stars."));
    return wrap;
  }

  form = document.createElement("form");
  form.id = "review-form";
  form.noValidate = true;
  form.setAttribute("data-id", product.id);

  fieldset = document.createElement("fieldset");
  fieldset.className = "star-field";
  legend = document.createElement("legend");
  legend.textContent = "Your rating";
  fieldset.appendChild(legend);

  for (star = 1; star <= 5; star++) {
    var choice = document.createElement("label");
    var input = document.createElement("input");
    choice.className = "star-choice";
    input.type = "radio";
    input.name = "rating";
    input.value = String(star);
    choice.appendChild(input);
    choice.appendChild(document.createTextNode(" " + star + (star === 1 ? " star" : " stars")));
    fieldset.appendChild(choice);
  }

  field = el("div", "field");
  label = document.createElement("label");
  label.htmlFor = "review-comment";
  label.textContent = "Your comment";
  textarea = document.createElement("textarea");
  textarea.id = "review-comment";
  textarea.maxLength = 300;
  message = el("p", "form-message");
  message.id = "review-message";
  submit = el("button", "btn btn-primary", "Submit review");
  submit.type = "submit";

  field.appendChild(label);
  field.appendChild(textarea);
  form.appendChild(fieldset);
  form.appendChild(field);
  form.appendChild(message);
  form.appendChild(submit);
  wrap.appendChild(form);
  return wrap;
}

// Fills the detail area for the product the user just opened.
function renderProductDetail() {
  var box = document.getElementById("product-detail");
  var product = findProduct(currentProductId);
  var layout;
  var visual;
  var info;
  var title;
  var stock;
  var addButton;

  box.innerHTML = "";

  if (!product) {
    box.appendChild(el("p", "empty-state", "That product is not available."));
    return;
  }

  layout = el("div", "detail-layout");
  visual = el("div", "product-visual detail-visual " + categoryClass(product.category));
  visual.setAttribute("aria-hidden", "true");
  visual.appendChild(el("span", "product-emoji", product.emoji || "🪑"));

  info = el("div", "detail-info");
  title = el("h1", null, product.name);
  title.id = "product-title";
  title.tabIndex = -1;
  stock = el("p", product.stock > 0 ? "stock" : "stock out");
  stock.textContent = product.stock > 0 ? product.stock + " in stock" : "Out of stock";

  addButton = el("button", "btn btn-primary", "Add to cart");
  addButton.setAttribute("data-action", "add");
  addButton.setAttribute("data-id", product.id);
  if (product.stock < 1) {
    addButton.disabled = true;
    addButton.textContent = "Out of stock";
  }

  info.appendChild(el("p", "eyebrow", product.category));
  info.appendChild(title);
  info.appendChild(el("p", "price", formatPrice(product.price)));
  info.appendChild(createRatingLine(product));
  info.appendChild(stock);
  info.appendChild(el("p", null, product.description));
  info.appendChild(addButton);

  layout.appendChild(visual);
  layout.appendChild(info);
  box.appendChild(layout);
  box.appendChild(el("h2", null, "Reviews"));
  box.appendChild(createReviewList(product));
  box.appendChild(createReviewForm(product));
}

function openProduct(productId) {
  currentProductId = productId;
  renderProductDetail();
  showView("product", true);
}

// Adds the signed-in user's stars and comment, then redraws the average.
function submitReview(event) {
  var form = event.target;
  var product;
  var selected;
  var commentInput;
  var comment;
  var rating;

  event.preventDefault();

  if (!currentUser) {
    showFormMessage("review-message", "Please log in before writing a review.", "error");
    return;
  }

  product = findProduct(form.getAttribute("data-id"));
  if (!product) {
    return;
  }
  if (hasUserReviewed(product)) {
    showFormMessage("review-message", "You already reviewed this product.", "error");
    return;
  }

  // Find the selected star inside this form.
  selected = form.querySelector("input[name='rating']:checked");
  commentInput = document.getElementById("review-comment");
  comment = commentInput.value.trim();

  if (!selected) {
    showFormMessage("review-message", "Please choose a rating from 1 to 5 stars.", "error");
    return;
  }
  if (comment.length < 4) {
    setInvalid(commentInput);
    showFormMessage("review-message", "Please write a short comment of at least 4 characters.", "error");
    commentInput.focus();
    return;
  }

  rating = Number(selected.value);
  product.reviews.push({
    id: makeId("r"),
    userName: currentUser.name,
    userEmail: currentUser.email,
    rating: rating,
    comment: comment,
    date: new Date().toLocaleDateString("en-IN")
  });

  saveProducts();
  renderProducts();
  renderProductDetail();
  renderAdmin();
  showToast("Thank you. Your review was added and the rating was updated.", "success");
}

function getCartQuantity(productId) {
  var i;
  for (i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      return cart[i].quantity;
    }
  }
  return 0;
}

function getCartCount() {
  var count = 0;
  var i;
  for (i = 0; i < cart.length; i++) {
    count = count + cart[i].quantity;
  }
  return count;
}

function getCartSubtotal() {
  var total = 0;
  var i;
  for (i = 0; i < cart.length; i++) {
    var product = findProduct(cart[i].productId);
    if (product) {
      total = total + product.price * cart[i].quantity;
    }
  }
  return total;
}

// Adds one item, but never more than the product's stock.
function addToCart(productId) {
  var product = findProduct(productId);
  var found = null;
  var i;
  if (!product) {
    return;
  }
  if (product.stock < 1) {
    showToast("Sorry, that item is out of stock.", "error");
    return;
  }
  for (i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      found = cart[i];
    }
  }
  if (found) {
    if (found.quantity >= product.stock) {
      showToast("You already have the maximum available quantity in your cart.", "error");
      return;
    }
    found.quantity = found.quantity + 1;
  } else {
    cart.push({ productId: productId, quantity: 1 });
  }
  saveCart();
  renderCart();
  renderHeader();
  showToast(product.name + " was added to your cart.", "success");
}

function updateCartQuantity(productId, quantity) {
  var product = findProduct(productId);
  var i;
  if (!product) {
    return;
  }
  if (!Number.isFinite(quantity)) {
    renderCart();
    return;
  }
  quantity = Math.floor(quantity);
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }
  if (quantity > product.stock) {
    showToast("Only " + product.stock + " of " + product.name + " are in stock.", "error");
    quantity = product.stock;
  }
  for (i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  saveCart();
  renderCart();
  renderHeader();
}

function removeFromCart(productId) {
  var next = [];
  var removedName = "Item";
  var i;
  for (i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      var product = findProduct(productId);
      if (product) {
        removedName = product.name;
      }
    } else {
      next.push(cart[i]);
    }
  }
  cart = next;
  saveCart();
  renderCart();
  renderHeader();
  showToast(removedName + " was removed from your cart.", "success");
}

function createCartRow(item) {
  var product = findProduct(item.productId);
  var row;
  var info;
  var controls;
  var decrease;
  var input;
  var increase;
  var removeButton;
  var side;
  if (!product) {
    return null;
  }

  row = el("article", "cart-row");
  info = el("div", "cart-info");
  info.appendChild(el("h3", null, product.name));
  info.appendChild(el("p", null, formatPrice(product.price) + " each · " + product.stock + " in stock"));

  controls = el("div", "qty-controls");
  decrease = el("button", "qty-btn", "−");
  decrease.setAttribute("data-action", "decrease");
  decrease.setAttribute("data-id", product.id);
  decrease.setAttribute("aria-label", "Decrease quantity of " + product.name);
  if (item.quantity <= 1) {
    decrease.disabled = true;
  }

  input = document.createElement("input");
  input.type = "number";
  input.className = "qty-input";
  input.min = "1";
  input.max = String(product.stock);
  input.value = String(item.quantity);
  input.setAttribute("aria-label", "Quantity of " + product.name);
  input.setAttribute("data-id", product.id);

  increase = el("button", "qty-btn", "+");
  increase.setAttribute("data-action", "increase");
  increase.setAttribute("data-id", product.id);
  increase.setAttribute("aria-label", "Increase quantity of " + product.name);
  if (item.quantity >= product.stock) {
    increase.disabled = true;
  }

  controls.appendChild(decrease);
  controls.appendChild(input);
  controls.appendChild(increase);
  info.appendChild(controls);

  removeButton = el("button", "btn btn-danger", "Remove");
  removeButton.setAttribute("data-action", "remove");
  removeButton.setAttribute("data-id", product.id);
  info.appendChild(removeButton);

  side = el("p", "price", formatPrice(product.price * item.quantity));
  row.appendChild(info);
  row.appendChild(side);
  return row;
}

function renderCart() {
  var itemsBox = document.getElementById("cart-items");
  var empty = document.getElementById("cart-empty");
  var summary = document.getElementById("cart-summary");
  var checkout = document.getElementById("checkout-panel");
  var confirmation = document.getElementById("order-confirmation");
  var subtotal;
  var i;

  itemsBox.innerHTML = "";
  confirmation.hidden = !showingConfirmation;

  if (showingConfirmation) {
    empty.hidden = true;
    summary.hidden = true;
    checkout.hidden = true;
    return;
  }

  if (cart.length === 0) {
    empty.hidden = false;
    summary.hidden = true;
    checkout.hidden = true;
    return;
  }

  empty.hidden = true;
  summary.hidden = false;
  checkout.hidden = false;

  for (i = 0; i < cart.length; i++) {
    var row = createCartRow(cart[i]);
    if (row) {
      itemsBox.appendChild(row);
    }
  }

  subtotal = getCartSubtotal();
  document.getElementById("summary-subtotal").textContent = formatPrice(subtotal);
  document.getElementById("summary-total").textContent = formatPrice(subtotal);
}

function prefillCheckout() {
  var nameInput = document.getElementById("checkout-name");
  var emailInput = document.getElementById("checkout-email");
  if (!currentUser) {
    return;
  }
  if (nameInput.value.trim() === "") {
    nameInput.value = currentUser.name;
  }
  if (emailInput.value.trim() === "") {
    emailInput.value = currentUser.email;
  }
}

function makeOrderNumber() {
  var highest = 1000;
  var i;
  for (i = 0; i < orders.length; i++) {
    var parts = String(orders[i].orderNumber).split("-");
    var value = Number(parts[1]);
    if (Number.isFinite(value) && value > highest) {
      highest = value;
    }
  }
  return "OH-" + (highest + 1);
}

function fillConfirmation(order) {
  var list = document.getElementById("confirm-items");
  var i;
  document.getElementById("confirm-lead").textContent = "Thanks, " + order.customerName + ". Your order request was saved in this browser.";
  document.getElementById("confirm-order-number").textContent = order.orderNumber;
  document.getElementById("confirm-total").textContent = formatPrice(order.total);
  list.innerHTML = "";
  for (i = 0; i < order.items.length; i++) {
    var item = order.items[i];
    var li = document.createElement("li");
    li.textContent = item.quantity + " × " + item.name + " — " + formatPrice(item.price * item.quantity);
    list.appendChild(li);
  }
}

// Checks the checkout form and returns the details, or null if something is missing.
function readCheckoutDetails() {
  var form = document.getElementById("checkout-form");
  var nameInput = document.getElementById("checkout-name");
  var emailInput = document.getElementById("checkout-email");
  var phoneInput = document.getElementById("checkout-phone");
  var addressInput = document.getElementById("checkout-address");
  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var phone = phoneInput.value.trim();
  var address = addressInput.value.trim();
  var phoneDigits = digitsOnly(phone);
  var errors = [];
  var firstInvalid = null;

  clearInvalid(form);

  if (name.length < 2) {
    setInvalid(nameInput);
    errors.push("Please enter the customer name.");
    firstInvalid = nameInput;
  }
  if (email === "") {
    setInvalid(emailInput);
    errors.push("Please enter an email address.");
    if (!firstInvalid) firstInvalid = emailInput;
  } else if (!isValidEmail(email)) {
    setInvalid(emailInput);
    errors.push("Enter an email address like name@example.com.");
    if (!firstInvalid) firstInvalid = emailInput;
  }
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    setInvalid(phoneInput);
    errors.push("Enter a phone number with 10 to 15 digits.");
    if (!firstInvalid) firstInvalid = phoneInput;
  }
  if (address.length < 10) {
    setInvalid(addressInput);
    errors.push("Enter a delivery address with at least 10 characters.");
    if (!firstInvalid) firstInvalid = addressInput;
  }

  if (errors.length > 0) {
    showFormMessage("checkout-message", errors.join(" "), "error");
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return null;
  }

  showFormMessage("checkout-message", "");
  return {
    name: name,
    email: email,
    phone: phone,
    address: address
  };
}

// Saves a demo order request, lowers stock, and clears the cart. It does not take payment.
function placeOrder(event) {
  var details;
  var items = [];
  var i;
  var order;

  event.preventDefault();
  if (placingOrder) {
    return;
  }
  placingOrder = true;

  sanitizeCart();
  renderCart();

  if (cart.length === 0) {
    showFormMessage("checkout-message", "Your cart is empty.", "error");
    placingOrder = false;
    return;
  }

  details = readCheckoutDetails();
  if (!details) {
    placingOrder = false;
    return;
  }

  for (i = 0; i < cart.length; i++) {
    var product = findProduct(cart[i].productId);
    if (!product || cart[i].quantity > product.stock) {
      showFormMessage("checkout-message", "Sorry, one item does not have enough stock. Please update the cart.", "error");
      renderCart();
      renderProducts();
      placingOrder = false;
      return;
    }
    // Copy the name and price now, so a later edit does not change this order.
    items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: cart[i].quantity
    });
  }

  for (i = 0; i < items.length; i++) {
    var sold = findProduct(items[i].productId);
    sold.stock = sold.stock - items[i].quantity;
  }

  order = {
    orderNumber: makeOrderNumber(),
    placedAt: new Date().toLocaleString("en-IN"),
    customerName: details.name,
    email: details.email,
    phone: details.phone,
    address: details.address,
    items: items,
    subtotal: getCartSubtotal(),
    total: getCartSubtotal(),
    note: "Demo order request. No payment was collected."
  };

  // Recalculate the total before stock changes affect anything. Prices are already copied.
  order.subtotal = 0;
  for (i = 0; i < items.length; i++) {
    order.subtotal = order.subtotal + items[i].price * items[i].quantity;
  }
  order.total = order.subtotal;

  orders.push(order);
  cart = [];
  saveProducts();
  saveOrders();
  saveCart();

  document.getElementById("checkout-form").reset();
  showFormMessage("checkout-message", "");
  showingConfirmation = true;
  fillConfirmation(order);
  renderCart();
  renderProducts();
  renderHeader();
  renderAdmin();
  renderOrders();
  document.getElementById("order-confirmation").focus();
  placingOrder = false;
}

function renderOrders() {
  var box = document.getElementById("order-history");
  var i;
  box.innerHTML = "";
  if (orders.length === 0) {
    box.appendChild(el("p", "empty-state", "No order requests yet. When you check out, the request will appear here and stay after a refresh."));
    return;
  }
  for (i = orders.length - 1; i >= 0; i--) {
    box.appendChild(createOrderCard(orders[i]));
  }
}

function createOrderCard(order) {
  var card = el("article", "order-card");
  var list = document.createElement("ul");
  var i;
  card.appendChild(el("h3", null, order.orderNumber));
  card.appendChild(el("p", null, order.placedAt || ""));
  card.appendChild(el("p", null, (order.customerName || "Customer") + " · " + (order.email || "") + " · " + (order.phone || "")));
  card.appendChild(el("p", null, order.address || ""));
  for (i = 0; i < order.items.length; i++) {
    var item = order.items[i];
    var li = document.createElement("li");
    li.textContent = item.quantity + " × " + item.name;
    list.appendChild(li);
  }
  card.appendChild(list);
  card.appendChild(el("p", "price", formatPrice(order.total || 0)));
  card.appendChild(el("p", "hint", order.note || "Demo order request. No payment was collected."));
  return card;
}

// Creates a customer account and signs that person in. The password is plain text on purpose.
function registerUser(event) {
  var form = document.getElementById("register-form");
  var nameInput = document.getElementById("register-name");
  var emailInput = document.getElementById("register-email");
  var passwordInput = document.getElementById("register-password");
  var confirmInput = document.getElementById("register-confirm");
  var name = nameInput.value.trim();
  var email = emailInput.value.trim().toLowerCase();
  var password = passwordInput.value;
  var confirm = confirmInput.value;
  var errors = [];
  var firstInvalid = null;

  event.preventDefault();
  clearInvalid(form);

  if (name.length < 2 || name.length > 60) {
    setInvalid(nameInput);
    errors.push("Please enter your name (2 to 60 characters).");
    firstInvalid = nameInput;
  }
  if (email === "") {
    setInvalid(emailInput);
    errors.push("Please enter an email address.");
    if (!firstInvalid) firstInvalid = emailInput;
  } else if (!isValidEmail(email)) {
    setInvalid(emailInput);
    errors.push("Enter an email address like name@example.com.");
    if (!firstInvalid) firstInvalid = emailInput;
  } else if (email === ADMIN_EMAIL) {
    setInvalid(emailInput);
    errors.push("That email is reserved for the demo admin. Please use Log in.");
    if (!firstInvalid) firstInvalid = emailInput;
  } else if (findUser(email)) {
    setInvalid(emailInput);
    errors.push("An account with that email already exists. Try logging in.");
    if (!firstInvalid) firstInvalid = emailInput;
  }
  if (password.length < 6) {
    setInvalid(passwordInput);
    errors.push("Use at least 6 characters. Do not use a real password in this demo.");
    if (!firstInvalid) firstInvalid = passwordInput;
  }
  if (password !== confirm) {
    setInvalid(confirmInput);
    errors.push("The two passwords do not match.");
    if (!firstInvalid) firstInvalid = confirmInput;
  }

  if (errors.length > 0) {
    showFormMessage("register-message", errors.join(" "), "error");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  // The password is saved in plain text on purpose for this classroom demo.
  // A real website must never do this.
  users.push({
    name: name,
    email: email,
    password: password,
    role: "customer"
  });
  currentUser = publicUser(users[users.length - 1]);
  saveUsers();
  saveSession();
  form.reset();
  document.getElementById("login-form").reset();
  showFormMessage("register-message", "");
  showFormMessage("login-message", "");
  renderAccount();
  showToast("Account created. You are now signed in.", "success");
}

// Checks the email and password against the demo accounts saved in this browser.
function loginUser(event) {
  var form = document.getElementById("login-form");
  var emailInput = document.getElementById("login-email");
  var passwordInput = document.getElementById("login-password");
  var email = emailInput.value.trim().toLowerCase();
  var password = passwordInput.value;
  var user;
  var errors = [];
  var firstInvalid = null;

  event.preventDefault();
  clearInvalid(form);

  if (email === "") {
    setInvalid(emailInput);
    errors.push("Please enter your email.");
    firstInvalid = emailInput;
  }
  if (password === "") {
    setInvalid(passwordInput);
    errors.push("Please enter your password.");
    if (!firstInvalid) firstInvalid = passwordInput;
  }
  if (errors.length > 0) {
    showFormMessage("login-message", errors.join(" "), "error");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  user = findUser(email);
  if (!user || user.password !== password) {
    setInvalid(emailInput);
    setInvalid(passwordInput);
    showFormMessage("login-message", "That email and password do not match a saved demo account.", "error");
    passwordInput.focus();
    return;
  }

  currentUser = publicUser(user);
  saveSession();
  form.reset();
  showFormMessage("login-message", "");
  renderAccount();
  renderAdmin();
  if (!document.getElementById("product-view").hidden) {
    renderProductDetail();
  }
  if (currentUser.role === "admin") {
    showToast("Welcome back. The admin dashboard is now available.", "success");
  } else {
    showToast("Welcome back, " + currentUser.name + ".", "success");
  }
}

function logoutUser() {
  currentUser = null;
  saveSession();
  renderAccount();
  renderProductDetail();
  showToast("You have logged out.", "success");
  if (!document.getElementById("admin-view").hidden || !document.getElementById("product-view").hidden) {
    showView("account", true);
  }
}

function renderAccount() {
  var loggedIn = document.getElementById("logged-in-panel");
  var loggedOut = document.getElementById("logged-out-panel");
  var adminButton = document.getElementById("open-admin-from-account");
  if (currentUser) {
    loggedIn.hidden = false;
    loggedOut.hidden = true;
    document.getElementById("welcome-text").textContent = "You are signed in as " + currentUser.name + " (" + currentUser.email + ").";
    if (currentUser.role === "admin") {
      document.getElementById("role-note").textContent = "This is the demo admin account. You can open the Admin page to add, edit, or delete products.";
      adminButton.hidden = false;
    } else {
      document.getElementById("role-note").textContent = "You can review furniture and place an order request. This account exists only in this browser.";
      adminButton.hidden = true;
    }
  } else {
    loggedIn.hidden = true;
    loggedOut.hidden = false;
    adminButton.hidden = true;
  }
  renderHeader();
}

function renderHeader() {
  var count = getCartCount();
  var cartButton = document.getElementById("cart-link");
  var accountLink = document.getElementById("account-link");
  var adminLink = document.getElementById("admin-link");
  var userLabel = document.getElementById("user-label");

  document.getElementById("cart-count").textContent = String(count);
  cartButton.setAttribute("aria-label", "Cart, " + count + (count === 1 ? " item" : " items"));

  if (currentUser) {
    accountLink.textContent = "Account";
    userLabel.hidden = false;
    userLabel.textContent = "Signed in as " + currentUser.name;
    adminLink.hidden = currentUser.role !== "admin";
  } else {
    accountLink.textContent = "Log in";
    userLabel.hidden = true;
    userLabel.textContent = "";
    adminLink.hidden = true;
  }
}

function resetProductForm() {
  var form = document.getElementById("product-form");
  editingProductId = null;
  form.reset();
  clearInvalid(form);
  document.getElementById("product-form-title").textContent = "Add a product";
  document.getElementById("product-save-button").textContent = "Add product";
  document.getElementById("product-cancel-edit").hidden = true;
}

function startEditProduct(productId) {
  var product = findProduct(productId);
  if (!requireAdmin() || !product) {
    return;
  }
  editingProductId = productId;
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-category").value = product.category;
  document.getElementById("product-price").value = String(product.price);
  document.getElementById("product-stock").value = String(product.stock);
  document.getElementById("product-description").value = product.description;
  document.getElementById("product-form-title").textContent = "Edit product";
  document.getElementById("product-save-button").textContent = "Save changes";
  document.getElementById("product-cancel-edit").hidden = false;
  showFormMessage("product-form-message", "You are editing " + product.name + ". Reviews stay attached to this product.", "success");
  renderAdmin();
  document.getElementById("product-form-title").scrollIntoView();
  document.getElementById("product-name").focus();
}

function categoryIsAllowed(category) {
  var i;
  for (i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i] === category) {
      return true;
    }
  }
  return false;
}

// Reads the admin form, checks every field, then adds or updates a product.
function saveProductFromForm(event) {
  var form = document.getElementById("product-form");
  var nameInput = document.getElementById("product-name");
  var categoryInput = document.getElementById("product-category");
  var priceInput = document.getElementById("product-price");
  var stockInput = document.getElementById("product-stock");
  var descriptionInput = document.getElementById("product-description");
  var name = nameInput.value.trim();
  var category = categoryInput.value;
  var priceRaw = priceInput.value.trim();
  var stockRaw = stockInput.value.trim();
  var description = descriptionInput.value.trim();
  var price = Number(priceRaw);
  var stock = Number(stockRaw);
  var errors = [];
  var firstInvalid = null;
  var product;
  var message;
  var cartChanged;

  event.preventDefault();
  if (!requireAdmin()) {
    showToast("Only the demo admin can change products.", "error");
    return;
  }

  clearInvalid(form);

  if (name.length < 2 || name.length > 80) {
    setInvalid(nameInput);
    errors.push("Enter a product name with 2 to 80 characters.");
    firstInvalid = nameInput;
  }
  if (!categoryIsAllowed(category)) {
    setInvalid(categoryInput);
    errors.push("Please choose a category.");
    if (!firstInvalid) firstInvalid = categoryInput;
  }
  if (priceRaw === "" || !Number.isFinite(price) || Math.round(price) !== price || price < 1 || price > 1000000) {
    setInvalid(priceInput);
    errors.push("Enter a whole price from ₹1 to ₹10,00,000.");
    if (!firstInvalid) firstInvalid = priceInput;
  }
  if (stockRaw === "" || !Number.isFinite(stock) || Math.round(stock) !== stock || stock < 0 || stock > 1000) {
    setInvalid(stockInput);
    errors.push("Enter a whole stock number from 0 to 1000.");
    if (!firstInvalid) firstInvalid = stockInput;
  }
  if (description.length < 10 || description.length > 400) {
    setInvalid(descriptionInput);
    errors.push("Enter a description with 10 to 400 characters.");
    if (!firstInvalid) firstInvalid = descriptionInput;
  }

  if (errors.length > 0) {
    showFormMessage("product-form-message", errors.join(" "), "error");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  if (editingProductId) {
    product = findProduct(editingProductId);
    if (!product) {
      showFormMessage("product-form-message", "That product could not be found.", "error");
      resetProductForm();
      return;
    }
    // Change the shop fields only. Reviews stay on the same product.
    product.name = name;
    product.category = category;
    product.price = price;
    product.stock = stock;
    product.description = description;
    if (!product.emoji) {
      product.emoji = emojiForCategory(category);
    }
    message = "Product updated.";
  } else {
    products.push({
      id: makeId("p"),
      name: name,
      category: category,
      price: price,
      description: description,
      stock: stock,
      emoji: emojiForCategory(category),
      reviews: []
    });
    message = "Product added.";
  }

  cartChanged = sanitizeCart();
  if (cartChanged) {
    saveCart();
    message = message + " The cart was updated to match the stock.";
  }
  saveProducts();
  resetProductForm();
  showFormMessage("product-form-message", message, "success");
  renderProducts();
  renderCart();
  renderHeader();
  renderAdmin();
  if (!document.getElementById("product-view").hidden) {
    renderProductDetail();
  }
  showToast(message, "success");
}

// Asks before deleting, then removes the product from the catalogue and the cart.
function deleteProduct(productId) {
  var product = findProduct(productId);
  var remaining = [];
  var sure;
  var i;
  if (!requireAdmin()) {
    showToast("Only the demo admin can delete products.", "error");
    return;
  }
  if (!product) {
    return;
  }
  sure = window.confirm('Delete "' + product.name + '"? This removes it from the demo catalogue.');
  if (!sure) {
    return;
  }
  for (i = 0; i < products.length; i++) {
    if (products[i].id !== productId) {
      remaining.push(products[i]);
    }
  }
  products = remaining;
  if (editingProductId === productId) {
    resetProductForm();
  }
  if (currentProductId === productId) {
    currentProductId = null;
  }
  sanitizeCart();
  saveProducts();
  saveCart();
  renderProducts();
  renderCart();
  renderHeader();
  renderAdmin();
  showToast(product.name + " was deleted.", "success");
}

function createAdminRow(product) {
  var row = el("article", "admin-row");
  var info = el("div", null);
  var actions = el("div", "admin-actions");
  var editButton = el("button", "btn btn-secondary", "Edit");
  var deleteButton = el("button", "btn btn-danger", "Delete");

  if (product.id === editingProductId) {
    row.classList.add("is-editing");
  }
  info.appendChild(el("h3", null, product.name));
  info.appendChild(el("p", null, product.category + " · " + formatPrice(product.price)));
  var reviewCount = getValidReviews(product).length;
  info.appendChild(el(
    "p",
    null,
    product.stock + " in stock · " + reviewCount + (reviewCount === 1 ? " review" : " reviews")
  ));
  editButton.setAttribute("data-action", "edit");
  editButton.setAttribute("data-id", product.id);
  deleteButton.setAttribute("data-action", "delete");
  deleteButton.setAttribute("data-id", product.id);
  actions.appendChild(editButton);
  actions.appendChild(deleteButton);
  row.appendChild(info);
  row.appendChild(actions);
  return row;
}

function renderAdmin() {
  var list = document.getElementById("admin-product-list");
  var i;
  list.innerHTML = "";
  if (!requireAdmin()) {
    return;
  }
  if (products.length === 0) {
    list.appendChild(el("p", "empty-state", "No products yet. Use the form above to add one."));
    return;
  }
  for (i = 0; i < products.length; i++) {
    list.appendChild(createAdminRow(products[i]));
  }
}

function setMenuOpen(isOpen) {
  var nav = document.getElementById("site-nav");
  var toggle = document.getElementById("menu-toggle");
  if (isOpen) {
    nav.classList.add("is-open");
  } else {
    nav.classList.remove("is-open");
  }
  toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  toggle.textContent = isOpen ? "Close" : "Menu";
}

// Shows one main area and hides the others.
function showView(viewName, shouldFocus) {
  var viewIds = ["home", "product", "cart", "account", "admin"];
  var found = false;
  var i;
  var view;
  var heading;

  if (viewName === "admin" && !requireAdmin()) {
    showToast("Only the demo admin account can open the dashboard.", "error");
    viewName = "account";
  }

  for (i = 0; i < viewIds.length; i++) {
    if (viewIds[i] === viewName) {
      found = true;
    }
  }
  if (!found) {
    viewName = "home";
  }

  // Leaving or reopening the cart puts the confirmation away. The order stays in the account list.
  showingConfirmation = false;

  for (i = 0; i < viewIds.length; i++) {
    view = document.getElementById(viewIds[i] + "-view");
    view.hidden = viewIds[i] !== viewName;
  }

  if (viewName === "cart") {
    renderCart();
    prefillCheckout();
    showFormMessage("checkout-message", "");
    clearInvalid(document.getElementById("checkout-form"));
  }

  if (viewName === "account") {
    renderOrders();
  }

  if (viewName === "admin") {
    renderAdmin();
  }

  if (viewName === "product") {
    renderProductDetail();
  }

  setMenuOpen(false);
  window.scrollTo(0, 0);

  if (shouldFocus) {
    view = document.getElementById(viewName + "-view");
    heading = view.querySelector("h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    }
  }
}

function resetFilters() {
  searchText = "";
  activeCategory = "All";
  sortBy = "featured";
  document.getElementById("search-input").value = "";
  document.getElementById("category-filter").value = "All";
  document.getElementById("sort-select").value = "featured";
  renderProducts();
}

// Connects buttons and forms to the functions above. This runs once.
function setupEvents() {
  document.getElementById("logo-link").addEventListener("click", function (event) {
    event.preventDefault();
    showView("home", true);
  });

  document.getElementById("menu-toggle").addEventListener("click", function () {
    var isOpen = document.getElementById("site-nav").classList.contains("is-open");
    setMenuOpen(!isOpen);
  });

  document.getElementById("site-nav").addEventListener("click", function (event) {
    var button = findButton(event.target);
    var viewName;
    if (!button) return;
    viewName = button.getAttribute("data-view");
    if (!viewName) return;
    showView(viewName, true);
  });

  document.getElementById("shop-now").addEventListener("click", function () {
    showView("home", false);
    document.getElementById("catalogue-title").scrollIntoView();
  });

  document.getElementById("filter-form").addEventListener("submit", function (event) {
    event.preventDefault();
  });

  document.getElementById("search-input").addEventListener("input", function (event) {
    searchText = event.target.value;
    renderProducts();
  });

  document.getElementById("category-filter").addEventListener("change", function (event) {
    activeCategory = event.target.value;
    renderProducts();
  });

  document.getElementById("sort-select").addEventListener("change", function (event) {
    sortBy = event.target.value;
    renderProducts();
  });

  document.getElementById("reset-filters").addEventListener("click", resetFilters);

  document.getElementById("product-list").addEventListener("click", function (event) {
    var button = findButton(event.target);
    var action;
    var productId;
    if (!button) return;
    action = button.getAttribute("data-action");
    productId = button.getAttribute("data-id");
    if (action === "view") openProduct(productId);
    if (action === "add") addToCart(productId);
  });

  document.getElementById("back-to-catalogue").addEventListener("click", function () {
    showView("home", true);
  });

  document.getElementById("product-detail").addEventListener("click", function (event) {
    var button = findButton(event.target);
    if (!button) return;
    if (button.getAttribute("data-action") === "add") {
      addToCart(button.getAttribute("data-id"));
    }
    if (button.id === "go-to-login") {
      showView("account", true);
    }
  });

  document.getElementById("product-detail").addEventListener("submit", function (event) {
    if (event.target.id === "review-form") {
      submitReview(event);
    }
  });

  document.getElementById("cart-items").addEventListener("click", function (event) {
    var button = findButton(event.target);
    var action;
    var productId;
    if (!button) return;
    action = button.getAttribute("data-action");
    productId = button.getAttribute("data-id");
    if (action === "increase") updateCartQuantity(productId, getCartQuantity(productId) + 1);
    if (action === "decrease") updateCartQuantity(productId, getCartQuantity(productId) - 1);
    if (action === "remove") removeFromCart(productId);
  });

  document.getElementById("cart-items").addEventListener("change", function (event) {
    var input = event.target;
    if (!input.classList || !input.classList.contains("qty-input")) return;
    updateCartQuantity(input.getAttribute("data-id"), Number(input.value));
  });

  document.getElementById("checkout-form").addEventListener("submit", placeOrder);
  document.getElementById("continue-shopping").addEventListener("click", function () {
    showingConfirmation = false;
    showView("home", true);
  });

  document.getElementById("login-form").addEventListener("submit", loginUser);
  document.getElementById("register-form").addEventListener("submit", registerUser);
  document.getElementById("logout-button").addEventListener("click", logoutUser);

  document.getElementById("fill-demo-admin").addEventListener("click", function () {
    document.getElementById("login-email").value = ADMIN_EMAIL;
    document.getElementById("login-password").value = ADMIN_PASSWORD;
    showFormMessage("login-message", "Demo admin details are filled in. Click Log in. This is still only a student demo.", "success");
  });

  document.getElementById("open-admin-from-account").addEventListener("click", function () {
    showView("admin", true);
  });

  document.getElementById("product-form").addEventListener("submit", saveProductFromForm);
  document.getElementById("product-cancel-edit").addEventListener("click", function () {
    resetProductForm();
    showFormMessage("product-form-message", "Edit cancelled. You can add a new product or choose another one.", "success");
    renderAdmin();
  });

  document.getElementById("admin-product-list").addEventListener("click", function (event) {
    var button = findButton(event.target);
    var action;
    var productId;
    if (!button) return;
    action = button.getAttribute("data-action");
    productId = button.getAttribute("data-id");
    if (action === "edit") startEditProduct(productId);
    if (action === "delete") deleteProduct(productId);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });
}

// Reads any saved demo data, draws the page, and listens for clicks.
function startApp() {
  products = loadProducts();
  users = loadUsers();
  orders = loadOrders();
  cart = loadCart();
  currentUser = loadCurrentUser();
  if (sanitizeCart()) {
    saveCart();
  }
  setupEvents();
  renderHeader();
  renderProducts();
  renderCart();
  renderAccount();
  renderOrders();
  renderAdmin();
  showView("home", false);
  if (storageProblem) {
    showToast("Some saved demo data could not be read, so the page used safe starting data.", "error");
  }
}

// The script tag is at the bottom of index.html, so the HTML already exists.
startApp();
