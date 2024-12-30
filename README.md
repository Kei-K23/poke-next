# PokéNext

Explore the world of Pokémon with our modern Pokédex. A feature-rich Pokédex where users can explore, search, and interact with Pokémon data fetched from the [Pokémon API](https://pokeapi.co/). This app also allows users to favorite Pokémon, vote for the "roundest" Pokémon, and view a leaderboard of the voting results.

## Features

### 🎮 Pokémon Explorer

- Browse Pokémon data fetched dynamically from the official Pokémon API.
- View detailed information about each Pokémon.

### 🔍 Advanced Search & Filters

- Search for Pokémon by name, type, or other attributes.
- Use multiple filters to narrow down results.

### ❤️ Favorite Pokémon

- Add Pokémon to your favorites list for quick access.

### 🗳️ Vote for Roundest Pokémon

- Participate in voting to select the "roundest" Pokémon.
- View the results of voting in a leaderboard.

### 🏆 Leaderboard

- See the rankings of Pokémon based on user votes.
- Track which Pokémon are the most loved and roundest in the community.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React.js](https://reactjs.org/), [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.dev/)
- **Backend**: [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/)
- **API**: [Pokémon API](https://pokeapi.co/api/v2)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Kei-K23/poke-next.git
   cd poke-next
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up the environment variables**:
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   ```

4. **Run database migrations**:

   ```bash
   pnpm prisma migrate dev
   ```

5. **Start the development server**:
   ```bash
   pnpm dev
   ```

## Usage

- Open the app in your browser at [http://localhost:3000](http://localhost:3000).
- Explore Pokémon, use filters, favorite your top picks, and vote for the roundest Pokémon!
- Check out the leaderboard to see which Pokémon are leading the votes.

## Folder Structure

```plaintext
poke-next/
├── prisma/            # Prisma schema and migrations
├── public/            # Static assets
├── src/
│   ├── components/    # React components
│   ├── pages/         # Next.js pages
│   ├── lib/           # Utility functions and API integrations
│   ├── context/       # Context data for pokemon (including initial fetching pokemon data)
└────────
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your fork:
   ```bash
   git commit -m "Add your message"
   git push origin feature-name
   ```
4. Open a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Pokémon API](https://pokeapi.co/api/v2) for Pokémon data.

## Contact

For any inquiries or issues, feel free to reach out via the repository's [Issues](https://github.com/Kei-K23/poke-next.git/issues) section.
