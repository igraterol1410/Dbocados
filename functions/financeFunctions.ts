const currencyFormatter = (cantidad: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency: 'USD'
    })

    return formatter.format(cantidad)
  }

  export {
    currencyFormatter
  }