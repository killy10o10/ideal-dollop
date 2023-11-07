# Neighborhood Explorer App

> The _Neighborhood Explorer_ app is a tool that aims to make exploring a new area more convenient and enjoyable. It does this by allowing users to input their interests and location and then generates a list of routes containing various spots, such as cafes, supermarkets, pharmacies, hospitals, bus/tram stops, and more. Users can customize their routes by specifying parameters like the length of the route, modes of transportation, and more.

## Table of Contents

- [Features](#features)
- [Road to MVP](#road-to-mvp)
- [Technologies](#built-with)
- [Setup](#getting-started)
- [Authors](#authors)

### Features

Here are the key features of the Neighborhood Explorer app:

#### 1. Route Generation

- Input your interests and location, and the app will generate a list of routes tailored to your preferences.
- Each route includes various spots relevant to your needs and interests.

#### 2. Customizable Routes

- The app allows you to customize routes by specifying parameters such as route length, modes of transportation, and more.
- Users can gamify their experience by completing routes and increasing their "hood familiarity."

#### 3. Gamification (Potential Feature)

- As a potential side implementation, the app may include a gamification element.
- Users can earn "hood familiarity" points for completing routes, and a ranking board could be created to compare familiarity with different neighborhoods, cities, and districts.

### Road to MVP

To bring this application to life, we have outlined the following roadmap:

1. **Data Sources**:

   - Utilize the Google Places API to fetch information about spots (cafes, supermarkets, etc.).
   - Use the Google Maps API for routing and navigation.

2. **Route Generation Algorithm**:

   - Develop an algorithm that picks spots based on user configurations and geographical proximity.

3. **User Experience Enhancement**:

   - Implement user-friendly features for route customization and gamification (if desired).

4. **Data Integration**:
   - Use historical route data to inform the generation of new routes, enhancing the quality of recommendations.

## Built With

- React
- Javascript
- Tailwind
- Vite
- **APIs**: Google Places API, Google Maps API

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- git
- Broswer to Display
- IDE to run and edit the code
- Node Package Manager (NPM)

### Setup

- open a terminal
- run ` git clone git@github.com:killy10o10/[repo_name].git`
- run ` cd [repo_name]`
- run `npm install`
- run `npm run dev`
- Enter `http://127.0.0.1:5173/[repo_name]/` in your browser

## Authors

👤 **Kingsley Okine**

- Twitter: [@Quami_Killy](https://twitter.com/Quami_Killy)
- LinkedIn: [Kingsley Okine](https://www.linkedin.com/in/kingsley-okine/)

👤 **Stephen Awuah**

- Twitter: [@official\_\_hunt](https://twitter.com/official__hunt)
- LinkedIn: [Stephen Awuah](https://www.linkedin.com/in/stephen-awuah-264538242/)

## Acknowledgments🤠

- Hat tip to [@gwuah\_](https://twitter.com/gwuah_) on twitter for this brilliant idea.

## 🤝 Contributing

Feel free to reach out to us for any questions, collaboration opportunities, or feedback. We hope you enjoy using the Neighborhood Explorer app and have fun exploring your neighborhood!

## 📝 License

This project is [MIT](./LICENSE) licensed.
