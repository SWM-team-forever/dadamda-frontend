import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

type ArticleTemplateProps = {
  url: string,
  author: string,
  authorImage: string,
  title: string,
  siteName: string,
  description: string,
  thumbnail: string,
  publishedDate: string,
};

function ArticleTemplate({ url, author, authorImage, title, siteName, description, thumbnail, publishedDate }: ArticleTemplateProps) {
  return (
    <div>
      <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#ffffff" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        image={thumbnail}
        alt="상품 이미지"
      />
      <CardContent>
        <Typography>description</Typography>
      </CardContent>
    </Card>
    </div>
  )
}

export default ArticleTemplate
