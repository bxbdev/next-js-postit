export default function handler(req, res) {
    res.status(200).end('Hello Cron!')
    console.log(req.body)
  }