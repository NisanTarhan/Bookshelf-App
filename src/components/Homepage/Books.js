import React from 'react';
import { connect } from "react-redux";
import Book from "./Book";
import { Col } from "reactstrap";
import { StyledBooks } from './BooksStyled';

const Books = (props) => {
    return (
        <StyledBooks direction={props.direction}>
            {
                props.items.map((item) => {
                    return <Col key={item} xs={3}>
                        <Book {...item} />
                    </Col>
                })
            }
        </StyledBooks>
    );
};

const mapStateToProps = state => {
    return {
        direction: state.books.direction
    };
}

export default connect(mapStateToProps)(Books);