import React from 'react'
import {Grid} from '@material-ui/core'
import { ClipLoader } from 'react-spinners';
import {makeStyles,useTheme} from '@material-ui/styles'

const useStyles = makeStyles(theme =>({
    root : {
        width : '100%',
        height : 'calc(100% - 100px) !important',
        '& div' : {
            maxWidth : 100,
            maxHeight : 100
        }
    }
}))

export default function Loading(props){
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Grid className={classes.root} container justify="center" alignItems="center" direction="column">
            <ClipLoader
            sizeUnit={"px"}
            size={props.small ? 50 : 100}
            color={theme.palette.primary.main}
            loading={true}
            />
        </Grid>
    )
}