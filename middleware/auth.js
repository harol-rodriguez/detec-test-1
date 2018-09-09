export default function ({store, error, redirect}) {
  if ( ! store.state.authUser) {
    error({
      message: 'No estás identificado!!!',
      statusCode: 403
    })
    return redirect('/login')
  }
};
