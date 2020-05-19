class Products extends Component {
  state = {
    clothes: null,
    filteredClothes: null,
    color: null,
    category: null,
    filteredCategories: null,
    gender: null,
    sizes: null,
    searchClothes: ''
  }

  handleFilter = (e, field) => {
    this.setState({ [field]: e.target.value}, this.filterValues)
  }
  filterValues = () => {
    const {
      filteredClothes,
      category,
      color,
      sizes
    } = this.state
    const filteredItems = products.filter((item) => {
      if (!product && !supplier) {
        return true
      }
      if (product && supplier) {
        return item.supplier.includes(supplier) && item.product.includes(product)
      }
      return product ? item.product.includes(product) : item.supplier.includes(supplier)
    })
    this.setState({ filteredItems }, this.sortValues)
  }
  render() {
    if (!this.state) return null
    console.log(this.state, 'I am state')
    const { products, filteredItems, newProduct } = this.state
    return (
      <div className="container">
        <ProductFilters
          handleSupplierFilter={e => this.handleFilter(e, 'supplier')}
          handleProductFilter={e => this.handleFilter(e, 'product')}
          handleSort={this.handleSort}
         />
        <ProductsTable
          products={products}
          filteredItems={filteredItems}
          handleDelete={this.handleDelete}
        />
        <ProductNew
          handleFormChange={this.handleFormChange}
          handleSubmit={this.handleSubmit}
          newProduct={newProduct}
        />
      </div>
    )
  }
}
export default Products