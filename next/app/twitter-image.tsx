// Twitter card image — reuses the OpenGraph image generator.
// `dynamic` is declared here rather than re-exported: Next 16 parses route
// segment config statically and rejects re-exported config fields.
export const dynamic = 'force-dynamic'

export { default, alt, size, contentType } from './opengraph-image'
