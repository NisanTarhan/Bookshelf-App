import React, { useState } from 'react';
import {
    Nav,
    Container,
    Row,
    Col,
    InputGroupAddon,
    Input,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    Button,
    ButtonGroup
} from 'reactstrap';
import { connect } from "react-redux";
import { StyledNavbarText, StyledInputGroup } from "./FilterSortBarStyles";
import { categories } from "../../constants";
import { setFilter, searchBooks, sortBooks, searchBy, selectDirection } from "../../state/ducks/books/action";

const FilterSortBar = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const handleDropdown = (e) => {
        props.setDropdownValue(e.target.value)
    }

    const handleButtonClick = (e) => {
        props.setButtonValue(e.target.value);
    }

    return (
        <div>
            <Container fluid className="bg-white" style={{ padding: "15px" }}>
                <Row>
                    <Col xs={6}>
                        <Nav className="bg-white">
                            <StyledNavbarText><strong>Categories:</strong></StyledNavbarText>
                            <StyledNavbarText active={!props.activeFilter} onClick={() => {
                                props.changeFilter("");
                            }}>All</StyledNavbarText>
                            {
                                categories.map((category) => {
                                    return <StyledNavbarText key={category} active={props.activeFilter === category} onClick={() => {
                                        props.changeFilter(category);
                                    }}>{category}</StyledNavbarText>
                                })
                            }
                        </Nav>
                    </Col>

                    <Col xs={6}>
                        <Row>
                            <Col xs={{ size: 1, offset: 1 }}>
                                <StyledInputGroup>
                                    <ButtonGroup>
                                        <Button value="row" color="primary" onClick={handleButtonClick} active={props.direction === "row"}>Card</Button>
                                        <Button value="column" color="primary" onClick={handleButtonClick} active={props.direction === "column"}>List</Button>
                                    </ButtonGroup>
                                </StyledInputGroup>
                            </Col>
                            <Col xs={{ size: 5, offset: 1 }}>
                                <StyledInputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                            <DropdownToggle caret>
                                                {`Search by ${props.dropDownValue}`}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem value="title" active={props.dropDownValue === "title"} onClick={handleDropdown}>Search by title</DropdownItem>
                                                <DropdownItem value="author" active={props.dropDownValue === "author"} onClick={handleDropdown}>Search by author</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </InputGroupAddon>
                                    <Input style={{ marginRight: "10px", width: "100px" }} onChange={(e) => {
                                        props.search(e.target.value)
                                    }} />
                                </StyledInputGroup>
                            </Col>
                            <Col xs={3}>
                                <StyledInputGroup>
                                    <Input style={{ marginRight: "10px", width: "0px" }} type="select" name="select" id="exampleSelect" onChange={(e) => {
                                        props.sort(e.target.value);
                                    }}>
                                        <option value="">No Sort</option>
                                        <option value="alphabetical">Sort Alphabetical</option>
                                        <option value="rating">Sort by Rating</option>
                                    </Input>
                                </StyledInputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activeFilter: state.books.filter,
        dropDownValue: state.books.searchBy,
        direction: state.books.direction
    }
};

const mapDispatchToProps = {
    changeFilter: setFilter,
    search: searchBooks,
    sort: sortBooks,
    setDropdownValue: searchBy,
    setButtonValue: selectDirection
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSortBar);