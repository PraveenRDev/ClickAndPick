import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	Row,
	Button,
	Col,
	ListGroup,
	ListGroupItem,
	Image,
	Card,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch()

	const cart = useSelector(state => state.cart)

	const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

	// calculate prices
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
	cart.totalPrice =
		Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

	cart.itemPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)

	const orderCreate = useSelector(state => state.orderCreate)
	const { order, success, error } = orderCreate

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`)
		}
		// eslint-disable-next-line
	}, [history, success])

	const placeOrderHandler = () => {
		const order = {
			orderItems: cart.cartItems,
			shippingAddress: cart.shippingAddress,
			paymentMethod: cart.paymentMethod,
			itemesPrice: cart.itemesPrice,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice,
			totalPrice: cart.totalPrice,
		}

		dispatch(createOrder(order))
	}

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
								{cart.shippingAddress.country}
							</p>
						</ListGroupItem>

						<ListGroupItem>
							<h2>Payment Method</h2>
							<strong>Method:</strong>
							{cart.paymentMethod}
						</ListGroupItem>

						<ListGroupItem>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your Cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroupItem key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													></Image>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroupItem>
									))}
								</ListGroup>
							)}
						</ListGroupItem>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h2>Order Summary</h2>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Items</Col>
									<Col>${cart.itemPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Total</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroupItem>
							{error && (
								<ListGroupItem>
									{error && <Message variant='danger'>{error}</Message>}
								</ListGroupItem>
							)}
							<ListGroupItem>
								<Button
									type='button'
									className='btn-block'
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
