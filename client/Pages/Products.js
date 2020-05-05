import React, { Component } from "react";

import { connect } from "react-redux";
import { getProducts } from "../Redux/Actions/ProductActions";

import { Row, Col, Layout } from "antd";
import ProductCard from "../Components/ProductCard";

const { Content } = Layout;

import { v4 as uuidv } from "uuid";

import "../scss/Pages/Products.scss";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }

  async componentDidMount() {
    await this.props.getProducts();
  }

  componentWillReceiveProps() {
    this.setState({
      isFetching: false,
    });

    this.forceUpdate();
  }

  renderItems = () => {
    if (this.state.isFetching === true) {
      return <h2>Loading...</h2>;
    }

    return this.props.Products.map((product) => {
      return (
        <Col xs={24} md={12} lg={8} className="content-position" key={uuidv()}>
          {/* Some formatting in description field to keep long descriptions manageable */}
          <ProductCard
            title={product.title}
            description={`${product.description.slice(0, 50).trim()}...`}
            self={product}
            key={uuidv()}
          />
        </Col>
      );
    });
  };

  render() {
    return (
      <Content className="container">
        <Row>{this.renderItems()}</Row>
      </Content>
    );
  }
}

const mapStateToProps = (store) => {
  return { Products: store.Products.AllProducts };
};

export default connect(mapStateToProps, { getProducts })(Products);
