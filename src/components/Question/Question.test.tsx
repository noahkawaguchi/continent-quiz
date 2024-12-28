import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Question from "./Question";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Question', () => {  
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());

  it('should update the display and inform its parent when the answer is correct', async () => {
    mockedAxios.get.mockImplementation((url: string) =>
      url === 'https://restcountries.com/v3.1/alpha/AI'
                ? Promise.resolve({data: anguilla})
                : Promise.reject(new Error('mocked error for Anguilla'))
    );
    const user = userEvent.setup();
    const isAnswerCorrect: Function = jest.fn();
    render(<Question cca2={'AI'} isAnswerCorrect={isAnswerCorrect} />); // Anguilla
    const NAButton = await waitFor(() => screen.getByText(/North\s*America/));
    await user.click(NAButton);
    const correctText = await waitFor(() => screen.getByText('Correct!'));
    expect(correctText).toBeInTheDocument();
    expect(correctText).toHaveTextContent('Correct!');
    expect(isAnswerCorrect).toHaveBeenCalledWith(true);
  });

  it('should update the display and inform its parent when the answer is incorrect', async () => {
    mockedAxios.get.mockImplementation((url: string) =>
      url === 'https://restcountries.com/v3.1/alpha/BE'
                ? Promise.resolve({data: belgium})
                : Promise.reject(new Error('mocked error for Belgium'))
    );
    const user = userEvent.setup();
    const isAnswerCorrect: Function = jest.fn();
    render(<Question cca2={'BE'} isAnswerCorrect={isAnswerCorrect} />); // Belgium
    const asiaButton = await waitFor(() => screen.getByText('Asia'));
    await user.click(asiaButton);
    const incorrectText = await waitFor(() => screen.getByText(/Incorrect/));
    expect(incorrectText).toBeInTheDocument();
    expect(incorrectText).toHaveTextContent('Incorrect. Correct answers for Belgium include: Europe.');
    expect(isAnswerCorrect).toHaveBeenCalledWith(false);
  });

});

const anguilla = {
  "AI": {
    "name": {
      "common": "Anguilla",
      "official": "Anguilla",
      "nativeName": {
        "eng": {
          "official": "Anguilla",
          "common": "Anguilla"
        }
      }
    },
    "tld": [
      ".ai"
    ],
    "cca2": "AI",
    "ccn3": "660",
    "cca3": "AIA",
    "independent": false,
    "status": "officially-assigned",
    "unMember": false,
    "currencies": {
      "XCD": {
        "name": "Eastern Caribbean dollar",
        "symbol": "$"
      }
    },
    "idd": {
      "root": "+1",
      "suffixes": [
        "264"
      ]
    },
    "capital": [
      "The Valley"
    ],
    "altSpellings": [
      "AI"
    ],
    "region": "Americas",
    "subregion": "Caribbean",
    "languages": {
      "eng": "English"
    },
    "translations": {
      "ara": {
        "official": "أنغويلا",
        "common": "أنغويلا"
      },
      "bre": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "ces": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "cym": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "deu": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "est": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "fin": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "fra": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "hrv": {
        "official": "Anguilla",
        "common": "Angvila"
      },
      "hun": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "ita": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "jpn": {
        "official": "アングィラ",
        "common": "アンギラ"
      },
      "kor": {
        "official": "앵귈라",
        "common": "앵귈라"
      },
      "nld": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "per": {
        "official": "آنگویلا",
        "common": "آنگویلا"
      },
      "pol": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "por": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "rus": {
        "official": "Ангилья",
        "common": "Ангилья"
      },
      "slk": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "spa": {
        "official": "Anguila",
        "common": "Anguilla"
      },
      "srp": {
        "official": "Ангвила",
        "common": "Ангвила"
      },
      "swe": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "tur": {
        "official": "Anguilla",
        "common": "Anguilla"
      },
      "urd": {
        "official": "اینگویلا",
        "common": "اینگویلا"
      },
      "zho": {
        "official": "安圭拉",
        "common": "安圭拉"
      }
    },
    "latlng": [18.25, -63.16666666],
    "landlocked": false,
    "area": 91,
    "demonyms": {
      "eng": {
        "f": "Anguillian",
        "m": "Anguillian"
      },
      "fra": {
        "f": "Anguillane",
        "m": "Anguillan"
      }
    },
    "flag": "🇦🇮",
    "maps": {
      "googleMaps": "https://goo.gl/maps/3KgLnEyN7amdno2p9",
      "openStreetMaps": "https://www.openstreetmap.org/relation/2177161"
    },
    "population": 13452,
    "fifa": "AIA",
    "car": {
      "signs": [
        "GB"
      ],
      "side": "left"
    },
    "timezones": [
      "UTC-04:00"
    ],
    "continents": [
      "North America"
    ],
    "flags": {
      "png": "https://flagcdn.com/w320/ai.png",
      "svg": "https://flagcdn.com/ai.svg"
    },
    "coatOfArms": {
      "png": "https://mainfacts.com/media/images/coats_of_arms/ai.png",
      "svg": "https://mainfacts.com/media/images/coats_of_arms/ai.svg"
    },
    "startOfWeek": "monday",
    "capitalInfo": {
      "latlng": [18.22, -63.05]
    }
  }
};

const belgium = {
  "BE":   {
    "name": {
      "common": "Belgium",
      "official": "Kingdom of Belgium",
      "nativeName": {
        "deu": {
          "official": "Königreich Belgien",
          "common": "Belgien"
        },
        "fra": {
          "official": "Royaume de Belgique",
          "common": "Belgique"
        },
        "nld": {
          "official": "Koninkrijk België",
          "common": "België"
        }
      }
    },
    "tld": [
      ".be"
    ],
    "cca2": "BE",
    "ccn3": "056",
    "cca3": "BEL",
    "cioc": "BEL",
    "independent": true,
    "status": "officially-assigned",
    "unMember": true,
    "currencies": {
      "EUR": {
        "name": "Euro",
        "symbol": "€"
      }
    },
    "idd": {
      "root": "+3",
      "suffixes": [
        "2"
      ]
    },
    "capital": [
      "Brussels"
    ],
    "altSpellings": [
      "BE",
      "België",
      "Belgie",
      "Belgien",
      "Belgique",
      "Kingdom of Belgium",
      "Koninkrijk België",
      "Royaume de Belgique",
      "Königreich Belgien"
    ],
    "region": "Europe",
    "subregion": "Western Europe",
    "languages": {
      "deu": "German",
      "fra": "French",
      "nld": "Dutch"
    },
    "translations": {
      "ara": {
        "official": "مملكة بلجيكا",
        "common": "بلجيكا"
      },
      "bre": {
        "official": "Rouantelezh Belgia",
        "common": "Belgia"
      },
      "ces": {
        "official": "Belgické království",
        "common": "Belgie"
      },
      "cym": {
        "official": "Teyrnas Gwlad Belg",
        "common": "Gwlad Belg"
      },
      "deu": {
        "official": "Königreich Belgien",
        "common": "Belgien"
      },
      "est": {
        "official": "Belgia Kuningriik",
        "common": "Belgia"
      },
      "fin": {
        "official": "Belgian kuningaskunta",
        "common": "Belgia"
      },
      "fra": {
        "official": "Royaume de Belgique",
        "common": "Belgique"
      },
      "hrv": {
        "official": "Kraljevina Belgija",
        "common": "Belgija"
      },
      "hun": {
        "official": "Belga Királyság",
        "common": "Belgium"
      },
      "ita": {
        "official": "Regno del Belgio",
        "common": "Belgio"
      },
      "jpn": {
        "official": "ベルギー王国",
        "common": "ベルギー"
      },
      "kor": {
        "official": "벨기에 왕국",
        "common": "벨기에"
      },
      "nld": {
        "official": "Koninkrijk België",
        "common": "België"
      },
      "per": {
        "official": "پادشاهی بلژیک",
        "common": "بلژیک"
      },
      "pol": {
        "official": "Królestwo Belgii",
        "common": "Belgia"
      },
      "por": {
        "official": "Reino da Bélgica",
        "common": "Bélgica"
      },
      "rus": {
        "official": "Королевство Бельгия",
        "common": "Бельгия"
      },
      "slk": {
        "official": "Belgické kráľovstvo",
        "common": "Belgicko"
      },
      "spa": {
        "official": "Reino de Bélgica",
        "common": "Bélgica"
      },
      "srp": {
        "official": "Краљевина Белгија",
        "common": "Белгија"
      },
      "swe": {
        "official": "Konungariket Belgien",
        "common": "Belgien"
      },
      "tur": {
        "official": "Belçika Krallığı",
        "common": "Belğika"
      },
      "urd": {
        "official": "مملکتِ بلجئیم",
        "common": "بلجئیم"
      },
      "zho": {
        "official": "比利时王国",
        "common": "比利时"
      }
    },
    "latlng": [50.83333333, 4],
    "landlocked": false,
    "borders": [
      "FRA",
      "DEU",
      "LUX",
      "NLD"
    ],
    "area": 30528,
    "demonyms": {
      "eng": {
        "f": "Belgian",
        "m": "Belgian"
      },
      "fra": {
        "f": "Belge",
        "m": "Belge"
      }
    },
    "flag": "🇧🇪",
    "maps": {
      "googleMaps": "https://goo.gl/maps/UQQzat85TCtPRXAL8",
      "openStreetMaps": "https://www.openstreetmap.org/relation/52411"
    },
    "population": 11555997,
    "gini": {
      "2018": 27.2
    },
    "fifa": "BEL",
    "car": {
      "signs": [
        "B"
      ],
      "side": "right"
    },
    "timezones": [
      "UTC+01:00"
    ],
    "continents": [
      "Europe"
    ],
    "flags": {
      "png": "https://flagcdn.com/w320/be.png",
      "svg": "https://flagcdn.com/be.svg",
      "alt": "The flag of Belgium is composed of three equal vertical bands of black, yellow and red."
    },
    "coatOfArms": {
      "png": "https://mainfacts.com/media/images/coats_of_arms/be.png",
      "svg": "https://mainfacts.com/media/images/coats_of_arms/be.svg"
    },
    "startOfWeek": "monday",
    "capitalInfo": {
      "latlng": [50.83, 4.33]
    },
    "postalCode": {
      "format": "####",
      "regex": "^(\\d{4})$"
    }
  }
};
