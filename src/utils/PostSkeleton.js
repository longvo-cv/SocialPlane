import React, {  Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImg from '../images/NoImg.png';

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


const styles = (theme) => ({
  ...theme.spreadThis,
 
});
 const PostSkeleton =props => {
    const{classes } = props
    const content = Array.from({length:5}).map((item,index) =>(
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}/>
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ))
    return  <Fragment>{content}</Fragment>
       
    
   
    
}
PostSkeleton.propTypes ={
     classes: PropTypes.object.isRequired
}
export default withStyles(styles)(PostSkeleton)
