import axios from "axios";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useProcessedRegionData } from "./useProcessedRegionData";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useProcessedRegionData', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());

  it('should fetch and process the region data from the API under normal conditions', async () => {
    mockedAxios.get.mockImplementation((url: string) =>
      url === 'https://restcountries.com/v3.1/alpha/MN'
                ? Promise.resolve({data: mongolia})
                : Promise.reject(new Error('mocked error for Mongolia'))
    );
    const { result } = renderHook(() => useProcessedRegionData('MN'));
    await waitFor(() => expect(result.current.loading).toBeFalsy());
    const { data, loading, error } = result.current;
    expect(loading).toBeFalsy();
    expect(error).toBeNull();
    expect(data?.commonName).toBe('Mongolia');
    expect(data?.continents).toContain('Asia');
    expect(data?.flagEmoji).toBe('🇲🇳');
  });
  
  it('should remain in loading state if the API stalls', async () => {
    jest.useFakeTimers();
    mockedAxios.get.mockImplementation(() => new Promise(() => {})); // Stalls indefinitely
    const { result, unmount } = renderHook(() => useProcessedRegionData('MF')); // Saint Martin
    
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();

    act(() => jest.advanceTimersByTime(10000)); // Advance 10 seconds

    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();

    unmount();
    jest.useRealTimers();
  });

  it('should return the error if the API call fails', async () => {
    const mockError = new Error('This is a mock error.');
    mockedAxios.get.mockRejectedValue(mockError);
    const { result } = renderHook(() => useProcessedRegionData('ZW')); // Zimbabwe
    await waitFor(() => expect(result.current.loading).toBeFalsy());
    const { data, loading, error } = result.current;
    expect(loading).toBeFalsy();
    expect(data).toBeNull();
    expect(error).toEqual(mockError);
  });

});

const mongolia = {
  "MN": {
    "name": {
      "common": "Mongolia",
      "official": "Mongolia",
      "nativeName": {
        "mon": {
          "official": "Монгол улс",
          "common": "Монгол улс"
        }
      }
    },
    "tld": [
      ".mn"
    ],
    "cca2": "MN",
    "ccn3": "496",
    "cca3": "MNG",
    "cioc": "MGL",
    "independent": true,
    "status": "officially-assigned",
    "unMember": true,
    "currencies": {
      "MNT": {
        "name": "Mongolian tögrög",
        "symbol": "₮"
      }
    },
    "idd": {
      "root": "+9",
      "suffixes": [
        "76"
      ]
    },
    "capital": [
      "Ulan Bator"
    ],
    "altSpellings": [
      "MN"
    ],
    "region": "Asia",
    "subregion": "Eastern Asia",
    "languages": {
      "mon": "Mongolian"
    },
    "translations": {
      "ara": {
        "official": "جمهورية منغوليا",
        "common": "منغوليا"
      },
      "bre": {
        "official": "Mongolia",
        "common": "Mongolia"
      },
      "ces": {
        "official": "Stát Mongolsko",
        "common": "Mongolsko"
      },
      "cym": {
        "official": "Mongolia",
        "common": "Mongolia"
      },
      "deu": {
        "official": "Mongolei",
        "common": "Mongolei"
      },
      "est": {
        "official": "Mongoolia",
        "common": "Mongoolia"
      },
      "fin": {
        "official": "Mongolian tasavalta",
        "common": "Mongolia"
      },
      "fra": {
        "official": "Mongolie",
        "common": "Mongolie"
      },
      "hrv": {
        "official": "Mongolija",
        "common": "Mongolija"
      },
      "hun": {
        "official": "Mongólia",
        "common": "Mongólia"
      },
      "ita": {
        "official": "Mongolia",
        "common": "Mongolia"
      },
      "jpn": {
        "official": "モンゴル",
        "common": "モンゴル"
      },
      "kor": {
        "official": "몽골",
        "common": "몽골국"
      },
      "nld": {
        "official": "Mongolië",
        "common": "Mongolië"
      },
      "per": {
        "official": "مغولستان",
        "common": "مغولستان"
      },
      "pol": {
        "official": "Mongolia",
        "common": "Mongolia"
      },
      "por": {
        "official": "Mongólia",
        "common": "Mongólia"
      },
      "rus": {
        "official": "Монголия",
        "common": "Монголия"
      },
      "slk": {
        "official": "Mongolsko",
        "common": "Mongolsko"
      },
      "spa": {
        "official": "Mongolia",
        "common": "Mongolia"
      },
      "srp": {
        "official": "Монголија",
        "common": "Монголија"
      },
      "swe": {
        "official": "Mongoliet",
        "common": "Mongoliet"
      },
      "tur": {
        "official": "Moğolistan",
        "common": "Moğolistan"
      },
      "urd": {
        "official": "منگولیا",
        "common": "منگولیا"
      },
      "zho": {
        "official": "蒙古",
        "common": "蒙古"
      }
    },
    "latlng": [46, 105],
    "landlocked": true,
    "borders": [
      "CHN",
      "RUS"
    ],
    "area": 1564110,
    "demonyms": {
      "eng": {
        "f": "Mongolian",
        "m": "Mongolian"
      },
      "fra": {
        "f": "Mongole",
        "m": "Mongol"
      }
    },
    "flag": "🇲🇳",
    "maps": {
      "googleMaps": "https://goo.gl/maps/A1X7bMCKThBDNjzH6",
      "openStreetMaps": "https://www.openstreetmap.org/relation/161033"
    },
    "population": 3278292,
    "gini": {
      "2018": 32.7
    },
    "fifa": "MNG",
    "car": {
      "signs": [
        "MGL"
      ],
      "side": "right"
    },
    "timezones": [
      "UTC+07:00",
      "UTC+08:00"
    ],
    "continents": [
      "Asia"
    ],
    "flags": {
      "png": "https://flagcdn.com/w320/mn.png",
      "svg": "https://flagcdn.com/mn.svg",
      "alt": "The flag of Mongolia is composed of three equal vertical bands of red, blue and red, with the national emblem — the Soyombo — in gold centered in the hoist-side red band."
    },
    "coatOfArms": {
      "png": "https://mainfacts.com/media/images/coats_of_arms/mn.png",
      "svg": "https://mainfacts.com/media/images/coats_of_arms/mn.svg"
    },
    "startOfWeek": "monday",
    "capitalInfo": {
      "latlng": [47.92, 106.91]
    },
    "postalCode": {
      "format": "######",
      "regex": "^(\\d{6})$"
    }
  }
};
