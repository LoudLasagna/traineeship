import { combineReducers } from 'redux'

const cartDefaultState = {
  products: [],
  data: [{
    id: 1,
    name: 'Товар 1',
    short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
    rating: 5,
    price: 1000,
    images: [{
      id: 1,
      url: 'https://picsum.photos/id/19/200'
    }, {
      id: 2,
      url: 'https://picsum.photos/id/20/200'
    }],
    main_image: 1
  },
  {
    id: 2,
    name: 'Товар 2',
    short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
    rating: 3,
    price: 2500,
    images: [{
      id: 3,
      url: 'https://picsum.photos/id/222/200'
    }, {
      id: 4,
      url: 'https://picsum.photos/id/64/200'
    }],
    main_image: 4
  },
  {
    id: 3,
    name: 'Товар 3',
    short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
    rating: 4,
    price: 13,
    images: [{
      id: 3,
      url: 'https://picsum.photos/id/122/200'
    }, {
      id: 4,
      url: 'https://picsum.photos/id/654/200'
    }],
    main_image: 3
  },
  {
    id: 4,
    name: 'Товаррррск',
    short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitttttttttttttttttttttttt.',
    full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
    rating: 1,
    price: 6666,
    images: [{
      id: 16,
      url: 'https://picsum.photos/id/1022/200'
    }, {
      id: 485,
      url: 'https://picsum.photos/id/1023/200'
    }, {
      id: 465,
      url: 'https://picsum.photos/id/1025/200'
    }, {
      id: 466,
      url: 'https://picsum.photos/id/1028/200'
    }],
    main_image: 465
  }
  ]
}

const usersDefaultState = {
  userList: [
    {
      name: 'Michael',
      phone: '8(999)999-99-99',
      email: 'ttt@ttt',
      password: 'test123',
      address: 'teeteet'
    }, {
      name: 'Jim',
      phone: '8(999)999-99-91',
      email: 'ttt@ttt',
      password: 'test123',
      address: 'teeteet'
    }, {
      name: 'Pam',
      phone: '8(999)999-99-92',
      email: 'ttt@ttt',
      password: 'test123',
      address: 'teeteet'
    }
  ],
  user: {},
  loggedIn: false
}

function cartReducer(state = cartDefaultState, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: action.product.id,
            amount: action.product.amount,
            price: action.product.price
          }
        ]
      }
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products:
          state.products.filter((arrayEntry) => arrayEntry.id !== action.product.id)
      }
    case 'SET_PRODUCT_AMOUNT':
      return {
        ...state,
        products:
          state.products.map((arrayEntry) => (
            arrayEntry.id === action.product.id
              ? {
                id: arrayEntry.id,
                amount: action.product.amount,
                price: action.product.price
              }
              : {
                id: arrayEntry.id,
                amount: arrayEntry.amount,
                price: arrayEntry.price
              }
          ))
      }
    case 'CLEAR_CART':
      return {
        ...state,
        products: []
      }
    case 'CHECKOUT':
      return {
        ...state,
        products: []
      }
    default:
      return state
  }
}

function userReducer(state = usersDefaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user, loggedIn: true }
    case 'LOGOUT':
      return { ...state, user: {}, loggedIn: false }
    case 'CHANGEUSER':
      return {
        ...state,
        user: action.newUser,
        userList:
          state.userList.map((arrayEntry) => (
            arrayEntry.name === action.oldUser.name && arrayEntry.phone === action.oldUser.phone
              ? action.newUser
              : arrayEntry
          ))
      }
    default:
      return state
  }
}

const myApp = combineReducers({
  cartReducer,
  userReducer
})

export default myApp
