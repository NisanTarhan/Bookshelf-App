import React from "react";
import { AddBookForm } from "../../components";
import { Row, Col, Container } from "reactstrap";
import axios from "axios";
import { apiHost } from "../../constants";

class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: ""
        }
    }

    componentDidMount() {
        const id = this.props.routerProps.match.params.id;
        if (id) {
            axios.get(`${apiHost}/books/${id}`).then((result) => {
                this.setState({
                    book: result.data
                })
            });
        }
    }

    render() {
        const isEdit = this.props.componentProps.isEdit;
        const id = this.props.routerProps.match.params.id;
        return (
            <Row>
                <Container>
                    <Col xs={12}>
                        {
                            isEdit ? <h3>Edit book</h3> : <h3>Add a new book</h3>
                        }
                    </Col>
                    <Col xs={12}>
                        <AddBookForm isEdit={isEdit} book={this.state.book} />
                    </Col>
                </Container>
            </Row>
        );
    }
}

export default AddBook;
