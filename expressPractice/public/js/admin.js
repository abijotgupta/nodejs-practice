const deleteProduct = (btn) => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    const product = btn.closest('article');

    fetch('/admin/product/' + prodId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf
        }
    })
        .then(result => result.json())
        .then(data => {
            console.log(data);
            product.parentNode.removeChild(product);
        })
        .catch(err => console.log(err));
}
