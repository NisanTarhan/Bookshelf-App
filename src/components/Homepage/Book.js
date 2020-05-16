import React from 'react';
import {
    CardImg, CardText, CardBody, CardLink
} from "reactstrap";
import { StyledBookCard } from "./BookStyles";
import { Link } from "react-router-dom";

const Book = (props) => {
    const { imageUrl, rating, title, id, review, goodReadsUrl } = props;
    return (
        <StyledBookCard >
            <CardImg top width="100%" src={imageUrl} alt={title} />
            <CardBody>
                <CardText>
                    <strong>{`${rating} / 5`}</strong>
                </CardText>
                <CardText>
                    {title}
                </CardText>
                <CardText>
                    {review}
                </CardText>
                <CardLink>
                    {
                        goodReadsUrl && <a href={goodReadsUrl} target="_blank" rel="noopener noreferrer">Details</a>
                    }
                </CardLink>
                <CardLink>
                    <Link to={`/edit-book/${id}`}>Edit Book</Link>
                </CardLink>
            </CardBody>
        </StyledBookCard>
    );
};

export default Book;