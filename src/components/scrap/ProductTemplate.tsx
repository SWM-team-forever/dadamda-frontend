import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type ProductTemplateProps = {
  url: string,
  image: string,
  title: string,
  type: string,
  price: string,
}

function ProductTemplate({url, image, title, price}: ProductTemplateProps) {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        title={title}
      />
      <CardMedia
        component="img"
        image={image}
        alt="상품 이미지"
      />
      <CardContent>
        <Typography>{price}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProductTemplate;
