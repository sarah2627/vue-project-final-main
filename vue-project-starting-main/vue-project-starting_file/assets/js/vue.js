// data
const products = [
    { id: 1, description: 'aPeinture provencale', price: 200, img: 'assets/img/tableau.jpg'},
    { id: 2, description: 'bPeinture provencale', price: 250, img: 'assets/img/tableau-deux.jpg'},
    { id: 3, description: 'bPeinture provencale', price: 225, img: 'assets/img/tableau-trois.png'},
    { id: 4, description: 'bPeinture provencale', price: 200, img: 'assets/img/tableau-quatre.jpg'},
    { id: 5, description: 'cPeinture provencale', price: 275, img: 'assets/img/tableau-cinq.jpg'},
    { id: 6, description: 'aPeinture provencale', price: 300, img: 'assets/img/tableau-six.jpg'},
    { id: 7, description: 'cPeinture provencale', price: 200, img: 'assets/img/tableau-sept.jpg'},
    { id: 8, description: 'Peinture provencale', price: 250, img: 'assets/img/tableau-huit.jpg'},
    { id: 9, description: 'Peinture provencale', price: 275, img: 'assets/img/tableau-neuf.jpg'},
    { id: 10, description: 'Peinture provencale', price: 225, img: 'assets/img/tableau-dix.jpg'},
    { id: 11, description: 'Peinture provencale', price: 300, img: 'assets/img/tableau-onze.jpg'},
    { id: 12, description: 'Peinture provencale', price: 250, img: 'assets/img/tableau-douze.jpg'},
];
  
const Home = {
    template: '#home',
    name: 'Home',
    data: () => {
        return {
            products,
            searchKey: '',
            liked: [],
            cart: []
        }
    },
    computed: {
        filteredList() {
            return this.products.filter((product) => {
                return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
            })
        },
        getLikeCookie() {
            let cookieValue = JSON.parse($cookies.get('like'));
            cookieValue == null ? this.liked = [] : this.liked = cookieValue;
        },
        cartTotalAmount() {
            let total = 0;
            for (let item in this.cart) {
                total = total + (this.cart[item].quantity * this.cart[item].price )
            }
            return total;
        },
        itemTotalAmount() {
            let itemTotal = 0;
            for (let item in this.cart) {
                itemTotal = itemTotal + (this.cart[item].quantity);
            }
            return itemTotal;
        }
    },
    methods: {
        setLikeCookies() {
            document.addEventListener('input', () => {
                setTimeout(() => {
                    $cookies.set('like', JSON.stringify(this.liked));
                }, 300);
            })
        },
        addToCart(product) {
            // check if already in array
            for (let i = 0; i  < this.cart.length; i++) {
                if (this.cart[i].id === product.id) {
                    return this.cart[i].quantity++
                }
            }
            this.cart.push({
                id: product.id,
                img: product.img,
                description: product.description,
                price: product.price,
                quantity: 1
            })
        },
        cartPlusOne(product) {
            product.quantity = product.quantity + 1;
        },
        cartRemoveItem(id) {
            this.$delete(this.cart, id)
        },
        cartMinusOne(product, id) {
            if (product.quantity == 1) {
                this.cartRemoveItem(id);
            } else {
                product.quantity = product.quantity - 1;
            }
        }
    },
    mounted: () => {
        this.getLikeCookie;
    }
}
const UserSettings = {
    template: '<h1> UserSettings </h1>',
    name: 'UserSettings'
}
const Wishlist = {
    template: '<h1> Wishlist </h1>',
    name: 'Wishlist'
}
const ShoppingCart = {
    template: '<h1> ShoppingCart </h1>',
    name: 'ShoppingCart'
}

// router
const router = new VueRouter({
    routes: [
        { path: '/', component: Home, name: 'Home' },
        { path: '/user-settings', component: UserSettings, name: 'UserSettings' },
        { path: '/wish-list', component: Wishlist, name: 'WishList' },
        { path: '/shopping-cart', component: ShoppingCart, name: 'ShoppingCart' }
    ]
})

const vue = new Vue({
    router
}).$mount('#app')