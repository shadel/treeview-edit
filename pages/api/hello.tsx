// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (
  req: unknown,
  res: { statusCode: number; json: (arg0: { name: string }) => void }
) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
