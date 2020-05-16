import React from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Container } from "reactstrap";
import { Formik } from "formik";
import { categories, ratings, statuses } from "../../constants";
import { addBook, updateBook } from "../../state/ducks/books/action";
import * as Yup from "yup";
import { withRouter } from "react-router";


const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is a required field"),
  author: Yup.string().required("Author is a required field"),
  review: Yup.string().min(30, "Too Short"),
  goodReadsUrl: Yup.string().url("Url is not a valid."),
});

const AddBookForm = (props) => {
  let initialValues = {
    title: "",
    author: "",
    category: "JavaScript",
    description: "",
    rating: "5",
    imageUrl: "",
    goodReadsUrl: "",
    status: "Not read",
    review: ""
  };
  if (props.isEdit && props.book) {
    initialValues = { ...props.book };
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (props.isEdit) {
            props.updateBook(props.book.id, values, props.history);
          } else {
            console.log(values);
            props.addBook(values, props.history);
          }
        }}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
        }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Name of the book"
                  value={values.title}
                  onChange={handleChange}
                  invalid={errors.title}
                />
                {
                  errors.title && <FormFeedback>{errors.title}</FormFeedback>
                }
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Author of the book"
                  value={values.author}
                  onChange={handleChange}
                  invalid={errors.author}
                />
                {
                  errors.author && <FormFeedback>{errors.author}</FormFeedback>
                }
              </FormGroup>
              <FormGroup>
                <Label for="imageUrl">Image URL</Label>
                <Input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  placeholder="Image of the book"
                  value={values.imageUrl}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="goodReadsUrl">Goodreads URL</Label>
                <Input
                  type="text"
                  name="goodReadsUrl"
                  id="goodReadsUrl"
                  placeholder="goodReadsUrl of the book"
                  value={values.goodReadsUrl}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Category</Label>
                <Input type="select" name="category" id="category" value={values.category} onChange={handleChange}>
                  {categories.map((category) => {
                    return <option>{category}</option>;
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" value={values.description}
                  onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="review">Review</Label>
                <Input type="textarea" name="review" id="review" value={values.review} invalid={errors.review}
                  onChange={handleChange} />
                {
                  errors.review && <FormFeedback>{errors.review}</FormFeedback>
                }
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Rating</Label>
                <Input type="select" name="rating" id="rating" value={values.rating} onChange={handleChange}>
                  {ratings.map((score) => {
                    return <option>{score}</option>;
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Status</Label>
                <Input type="select" name="status" id="status" value={values.status} onChange={handleChange}>
                  {statuses.map((status) => {
                    return <option>{status}</option>;
                  })}
                </Input>
              </FormGroup>
              {
                props.isEdit ?
                  <Button color="primary">Save</Button> : <Button color="primary">Add</Button>
              }
            </Form>
          )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  addBook,
  updateBook
};

export default withRouter(connect(null, mapDispatchToProps)(AddBookForm));
