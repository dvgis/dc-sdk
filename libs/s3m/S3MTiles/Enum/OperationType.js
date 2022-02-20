const OperationType = {
  RESET: 0,
  SetColor: 0x01,
  SELECTED: 0x02,
  HIDE: 0x04,
  OFFSET: 0x08,
  CLIP: 0x10,
  BLOOM: 0x20,
  ALL: 0xff
}

export default Object.freeze(OperationType)
