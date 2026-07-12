import { Payment } from '../models/index.js';

export const processPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, paymentMethod, token } = req.body;

    if (!amount || !paymentMethod || !token) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate token (in real app, verify with payment provider)
    if (token.length < 4) {
      return res.status(400).json({ error: 'Invalid payment token' });
    }

    const payment = await Payment.create(userId, amount, paymentMethod, token);

    res.status(201).json({
      message: 'Payment processed successfully',
      payment,
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
};

export const getUserPayments = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.findByUserId(userId);

    res.json({
      message: 'User payments retrieved successfully',
      payments,
      count: payments.length,
    });
  } catch (error) {
    console.error('Get user payments error:', error);
    res.status(500).json({ error: 'Failed to retrieve payments' });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();

    res.json({
      message: 'All payments retrieved successfully',
      payments,
      count: payments.length,
    });
  } catch (error) {
    console.error('Get all payments error:', error);
    res.status(500).json({ error: 'Failed to retrieve payments' });
  }
};
