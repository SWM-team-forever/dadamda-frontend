import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type ProductTemplateProps = {
  url: string,
  image: string,
  title: string,
  type: string,
  price: string,
}

function ProductTemplate({url, image, title, type, price}: ProductTemplateProps) {

  return (
    <Card sx={{ maxWidth: "33%" }}>
      <CardHeader
        title={title}
      />
      <CardMedia
        component="img"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography>{price}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProductTemplate;
