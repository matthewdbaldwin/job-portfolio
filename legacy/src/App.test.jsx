import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  it('renders key sections from the portfolio', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Samples of Work' })).toBeInTheDocument()
      expect(screen.getByText('Let’s Connect')).toBeInTheDocument()
    })
  })
})
