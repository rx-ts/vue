export const getItem = (sKey: string) => {
  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          '(?:(?:^|.*;)\\s*' +
            encodeURIComponent(sKey).replace(/[*+.-]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$',
        ),
        '$1',
      ),
    ) || null
  )
}

export const setItem = (
  sKey: string,
  sValue: string,
  vEnd?: string | number | Date,
  sPath?: string,
  sDomain?: string,
  bSecure?: boolean,
) => {
  if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
    return false
  }
  let sExpires = ''
  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        sExpires =
          vEnd === Infinity
            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
            : '; max-age=' + String(vEnd)
        break
      case String:
        sExpires = '; expires=' + (vEnd as string)
        break
      case Date:
        sExpires = '; expires=' + (vEnd as Date).toUTCString()
        break
    }
  }
  document.cookie =
    encodeURIComponent(sKey) +
    '=' +
    encodeURIComponent(sValue) +
    sExpires +
    (sDomain ? '; domain=' + sDomain : '') +
    (sPath ? '; path=' + sPath : '') +
    (bSecure ? '; secure' : '')
  return true
}
