import { render, screen, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import axios from "axios";
import App from "./App";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  beforeAll(() => {
    mockedAxios.get.mockImplementation((url: string) => {
      if (url === 'https://restcountries.com/v3.1/all?fields=cca2') {
        return Promise.resolve({data: kiribatiOnlyCCA2});
      } else if (url === 'https://restcountries.com/v3.1/alpha/KI') {
        return Promise.resolve({data: kiribati});
      } else {
        return Promise.reject(new Error('mocked error for Kiribati only simulation'))
      }
    });
  });
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());
  afterAll(() => jest.restoreAllMocks());

  it('should increment score or decrement lives based on answer correctness', async () => {
    render(<App />); // Forced to always pick Kiribati by mock implementation
    const user = userEvent.setup();

    const score = await waitFor(() => screen.getByLabelText('score'));
    const lives = await waitFor(() => screen.getByText(/Lives/));
    const oceania = await waitFor(() => screen.getByText('Oceania'));
    const africa = await waitFor(() => screen.getByText('Africa'));

    expect(score).toHaveTextContent(/Score:\s*0/);
    expect(lives).toHaveTextContent(/Lives:\s*5/);

    await user.click(oceania);
    expect(score).toHaveTextContent(/Score:\s*1/);
    expect(lives).toHaveTextContent(/Lives:\s*5/);

    await user.click(africa);
    expect(score).toHaveTextContent(/Score:\s*1/);
    expect(lives).toHaveTextContent(/Lives:\s*4/);

    await user.click(oceania);
    await user.click(oceania);
    await user.click(africa);
    await user.click(africa);
    expect(score).toHaveTextContent(/Score:\s*3/);
    expect(lives).toHaveTextContent(/Lives:\s*2/);
  });

  it('should end the quiz when the number of lives reaches 0', async () => {
    render(<App />); // Forced to always pick Kiribati by mock implementation
    const user = userEvent.setup();
    const question = await waitFor(() => screen.getByText(/Where is/));
    const africa = await waitFor(() => screen.getByText('Africa'));

    expect(question).toBeVisible();

    await user.click(africa);
    await user.click(africa);
    await user.click(africa);
    await user.click(africa);
    await user.click(africa);

    expect(question).not.toBeVisible();
    expect(await waitFor(() => screen.getByText('Game Over'))).toBeInTheDocument();
  });

  it('should reset the quiz if the user clicks play again', async () => {
    render(<App />); // Forced to always pick Kiribati by mock implementation
    const user = userEvent.setup();

    const score = await waitFor(() => screen.getByLabelText('score'));
    const lives = await waitFor(() => screen.getByText(/Lives/));
    let question = await waitFor(() => screen.getByText(/Where is/));
    const africa = await waitFor(() => screen.getByText('Africa'));

    await user.click(africa);
    await user.click(africa);
    await user.click(africa);
    await user.click(africa);
    await user.click(africa);
    expect(question).not.toBeVisible();

    await user.click(screen.getByText('Play Again?'));
    question = await waitFor(() => screen.getByText(/Where is/));
    expect(question).toBeVisible();
    expect(score).toHaveTextContent(/Score:\s*0/);
    expect(lives).toHaveTextContent(/Lives:\s*5/);
  });

  it('should preserve the high score between quizzes and visits to the page', async () => {
    const { unmount } = render(<App />);
    const user = userEvent.setup();
    let highScore = await waitFor(() => screen.getByText(/High Score/));
    let oceania = await waitFor(() => screen.getByText('Oceania'));
    const africa = await waitFor(() => screen.getByText('Africa'));

    expect(highScore).toHaveTextContent(/High Score:\s*0/);

    await user.click(oceania);
    await user.click(oceania);
    await user.click(oceania);

    expect(highScore).toHaveTextContent(/High Score:\s*3/);

    await user.click(africa);
    await user.click(africa);
    await user.click(africa);
    await user.click(africa);
    await user.click(africa);
    await user.click(screen.getByText('Play Again?'));
    expect(highScore).toHaveTextContent(/High Score:\s*3/);

    oceania = await waitFor(() => screen.getByText('Oceania'));
    await user.click(oceania);
    await user.click(oceania);
    await user.click(oceania);
    await user.click(oceania);
    await user.click(oceania);
    await user.click(oceania);

    expect(highScore).toHaveTextContent(/High Score:\s*6/);

    unmount();
    cleanup();

    render(<App />);
    highScore = await waitFor(() => screen.getByText(/High Score/));
    expect(highScore).toHaveTextContent(/High Score:\s*6/);
  });

});

const kiribatiOnlyCCA2 = [
  {
    "cca2": "KI"
  }
]

const kiribati = {
  "KI": {
    "name": {
      "common": "Kiribati",
      "official": "Independent and Sovereign Republic of Kiribati",
      "nativeName": {
        "eng": {
          "official": "Independent and Sovereign Republic of Kiribati",
          "common": "Kiribati"
        },
        "gil": {
          "official": "Ribaberiki Kiribati",
          "common": "Kiribati"
        }
      }
    },
    "tld": [
      ".ki"
    ],
    "cca2": "KI",
    "ccn3": "296",
    "cca3": "KIR",
    "cioc": "KIR",
    "independent": true,
    "status": "officially-assigned",
    "unMember": true,
    "currencies": {
      "AUD": {
        "name": "Australian dollar",
        "symbol": "$"
      },
      "KID": {
        "name": "Kiribati dollar",
        "symbol": "$"
      }
    },
    "idd": {
      "root": "+6",
      "suffixes": [
        "86"
      ]
    },
    "capital": [
      "South Tarawa"
    ],
    "altSpellings": [
      "KI",
      "Republic of Kiribati",
      "Ribaberiki Kiribati"
    ],
    "region": "Oceania",
    "subregion": "Micronesia",
    "languages": {
      "eng": "English",
      "gil": "Gilbertese"
    },
    "translations": {
      "ara": {
        "official": "جمهورية كيريباتي",
        "common": "كيريباتي"
      },
      "bre": {
        "official": "Republik Kiribati",
        "common": "Kiribati"
      },
      "ces": {
        "official": "Republika Kiribati",
        "common": "Kiribati"
      },
      "cym": {
        "official": "Independent and Sovereign Republic of Kiribati",
        "common": "Kiribati"
      },
      "deu": {
        "official": "Republik Kiribati",
        "common": "Kiribati"
      },
      "est": {
        "official": "Kiribati Vabariik",
        "common": "Kiribati"
      },
      "fin": {
        "official": "Kiribatin tasavalta",
        "common": "Kiribati"
      },
      "fra": {
        "official": "République de Kiribati",
        "common": "Kiribati"
      },
      "hrv": {
        "official": "Samostalne i suverene Republike Kiribati",
        "common": "Kiribati"
      },
      "hun": {
        "official": "Kiribati Köztársaság",
        "common": "Kiribati"
      },
      "ita": {
        "official": "Repubblica indipendente e sovrano di Kiribati",
        "common": "Kiribati"
      },
      "jpn": {
        "official": "キリバスの独立と主権共和国",
        "common": "キリバス"
      },
      "kor": {
        "official": "키리바시 공화국",
        "common": "키리바시"
      },
      "nld": {
        "official": "Onafhankelijke en soevereine republiek Kiribati",
        "common": "Kiribati"
      },
      "per": {
        "official": "جمهوری کیریباتی",
        "common": "کیریباتی"
      },
      "pol": {
        "official": "Republika Kiribati",
        "common": "Kiribati"
      },
      "por": {
        "official": "Independente e soberano República de Kiribati",
        "common": "Kiribati"
      },
      "rus": {
        "official": "Независимой и суверенной Республики Кирибати",
        "common": "Кирибати"
      },
      "slk": {
        "official": "Kiribatská republika",
        "common": "Kiribati"
      },
      "spa": {
        "official": "República Independiente y Soberano de Kiribati",
        "common": "Kiribati"
      },
      "srp": {
        "official": "Независна и Суверена Република Кирибати",
        "common": "Кирибати"
      },
      "swe": {
        "official": "Republiken Kiribati",
        "common": "Kiribati"
      },
      "tur": {
        "official": "Kiribati Cumhuriyeti",
        "common": "Kiribati"
      },
      "urd": {
        "official": "سلطنت آزاد جمہوریہ کیریباتی",
        "common": "کیریباتی"
      },
      "zho": {
        "official": "基里巴斯共和国",
        "common": "基里巴斯"
      }
    },
    "latlng": [1.41666666, 173],
    "landlocked": false,
    "area": 811,
    "demonyms": {
      "eng": {
        "f": "I-Kiribati",
        "m": "I-Kiribati"
      },
      "fra": {
        "f": "Kiribatienne",
        "m": "Kiribatien"
      }
    },
    "flag": "🇰🇮",
    "maps": {
      "googleMaps": "https://goo.gl/maps/NBfYvrndW4skAimw9",
      "openStreetMaps": "https://www.openstreetmap.org/relation/571178"
    },
    "population": 119446,
    "gini": {
      "2006": 37
    },
    "car": {
      "signs": [
        "KIR"
      ],
      "side": "left"
    },
    "timezones": [
      "UTC+12:00",
      "UTC+13:00",
      "UTC+14:00"
    ],
    "continents": [
      "Oceania"
    ],
    "flags": {
      "png": "https://flagcdn.com/w320/ki.png",
      "svg": "https://flagcdn.com/ki.svg",
      "alt": "The flag of Kiribati is divided into two halves. While the upper half has a red field, at the center of which is a yellow frigate bird flying over the top half of a rising yellow sun with seventeen visible rays, the lower half is composed of six horizontal wavy bands of white alternating with blue to depict the ocean."
    },
    "coatOfArms": {
      "png": "https://mainfacts.com/media/images/coats_of_arms/ki.png",
      "svg": "https://mainfacts.com/media/images/coats_of_arms/ki.svg"
    },
    "startOfWeek": "monday",
    "capitalInfo": {
      "latlng": [1.33, 172.98]
    }
  }
};
