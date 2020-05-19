class Products extends Component {
  state = {
    products: [],
    filteredItems: null,
    newProduct: {
      supplier: '',
      product: '',
      price: ''
    }
  }
  async componentDidMount() {
    const res = await axios.get('/api/products')
    this.setState({ products: res.data })
  }
  handleFormChange = ({ target: { id, value }}) => {
    const { newProduct } = this.state
    this.setState({ newProduct: {...newProduct, [id]: value }})
  }
  clearForm = () => {
    this.setState({ newProduct: { price: '', product: '', supplier: '' }})
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    const { products, newProduct } = this.state
    await axios.post('/api/products', newProduct)
    toast.success('New product added!', {containerId: 'A'})
    this.setState({ products: [...products, newProduct]}, this.clearForm)
  }
  handleSort = ({ target: { value }}) => {
    this.setState({ sortingBy: value }, this.sortValues)
  }
  sortValues = () => {
    const { products, filteredItems, sortingBy } = this.state
    if (sortingBy === 'ascending'){
      (filteredItems || products).sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else {
      (filteredItems || products).sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    }
    this.setState({ products, filteredItems })
  }
  handleDelete = async (e) => {
    const { products } = this.state
    const updatedArray = [...products]
    const index = updatedArray.findIndex(i => i._id === e.target.value)
    await axios.delete(`/api/products/${e.target.value}`)
    if (index !== -1) {
      updatedArray.splice(index, 1)
      this.setState({ products: [...updatedArray] })
      toast('Product deleted!', {containerId: 'B'})
    }
  }
  handleFilter = (e, field) => {
    this.setState({ [field]: e.target.value}, this.filterValues)
  }
  filterValues = () => {
    const {
      products,
      product,
      supplier
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