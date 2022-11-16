export default function healthCheck(req, res) {
  res.status(200).json({ message: 'Myra Good' });
}
