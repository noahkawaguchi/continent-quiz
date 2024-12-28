import axios from "axios";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useAllValidCCA2 } from "./useAllValidCCA2";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useAllValidCCA2', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());

  it('should fetch and process the CCA2 codes from the API under normal conditions', async () => {
    mockedAxios.get.mockImplementation((url: string) =>
      url === 'https://restcountries.com/v3.1/all?fields=cca2'
                ? Promise.resolve({data: cca2codes})
                : Promise.reject(new Error('mocked error for CCA2 codes'))
    );
    const { result } = renderHook(() => useAllValidCCA2());
    await waitFor(() => expect(result.current.loading).toBeFalsy());
    const { data, loading, error } = result.current;
    expect(loading).toBeFalsy();
    expect(error).toBeNull();
    expect(data).toContain('ZW');
    expect(data).toContain('BR');
  });

  it('should remain in loading state if the API stalls', async () => {
    jest.useFakeTimers();
    mockedAxios.get.mockImplementation(() => new Promise(() => {})); // Stalls indefinitely
    const { result, unmount } = renderHook(() => useAllValidCCA2());
    
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

  it('should return an error when the API call fails', async () => {
    const mockError = new Error('This is a mock error.');
    mockedAxios.get.mockRejectedValue(mockError);
    const { result } = renderHook(() => useAllValidCCA2());
    await waitFor(() => expect(result.current.loading).toBeFalsy());
    const { data, loading, error } = result.current;
    expect(loading).toBeFalsy();
    expect(data).toBeNull();
    expect(error).toEqual(mockError);
  });

});

const cca2codes = [
  {
    "cca2": "GS"
  },
  {
    "cca2": "GD"
  },
  {
    "cca2": "CH"
  },
  {
    "cca2": "SL"
  },
  {
    "cca2": "HU"
  },
  {
    "cca2": "TW"
  },
  {
    "cca2": "WF"
  },
  {
    "cca2": "BB"
  },
  {
    "cca2": "PN"
  },
  {
    "cca2": "CI"
  },
  {
    "cca2": "TN"
  },
  {
    "cca2": "IT"
  },
  {
    "cca2": "BJ"
  },
  {
    "cca2": "ID"
  },
  {
    "cca2": "CV"
  },
  {
    "cca2": "KN"
  },
  {
    "cca2": "LA"
  },
  {
    "cca2": "BQ"
  },
  {
    "cca2": "UG"
  },
  {
    "cca2": "AD"
  },
  {
    "cca2": "BI"
  },
  {
    "cca2": "ZA"
  },
  {
    "cca2": "FR"
  },
  {
    "cca2": "LY"
  },
  {
    "cca2": "MX"
  },
  {
    "cca2": "GA"
  },
  {
    "cca2": "MP"
  },
  {
    "cca2": "MK"
  },
  {
    "cca2": "CN"
  },
  {
    "cca2": "YE"
  },
  {
    "cca2": "BL"
  },
  {
    "cca2": "GG"
  },
  {
    "cca2": "SB"
  },
  {
    "cca2": "SJ"
  },
  {
    "cca2": "FO"
  },
  {
    "cca2": "UZ"
  },
  {
    "cca2": "EG"
  },
  {
    "cca2": "SN"
  },
  {
    "cca2": "LK"
  },
  {
    "cca2": "PS"
  },
  {
    "cca2": "BD"
  },
  {
    "cca2": "PE"
  },
  {
    "cca2": "SG"
  },
  {
    "cca2": "TR"
  },
  {
    "cca2": "AF"
  },
  {
    "cca2": "AW"
  },
  {
    "cca2": "CK"
  },
  {
    "cca2": "GB"
  },
  {
    "cca2": "ZM"
  },
  {
    "cca2": "FI"
  },
  {
    "cca2": "NE"
  },
  {
    "cca2": "CX"
  },
  {
    "cca2": "TK"
  },
  {
    "cca2": "GW"
  },
  {
    "cca2": "AZ"
  },
  {
    "cca2": "RE"
  },
  {
    "cca2": "DJ"
  },
  {
    "cca2": "KP"
  },
  {
    "cca2": "MU"
  },
  {
    "cca2": "MS"
  },
  {
    "cca2": "VI"
  },
  {
    "cca2": "CO"
  },
  {
    "cca2": "GR"
  },
  {
    "cca2": "HR"
  },
  {
    "cca2": "MA"
  },
  {
    "cca2": "DZ"
  },
  {
    "cca2": "AQ"
  },
  {
    "cca2": "NL"
  },
  {
    "cca2": "SD"
  },
  {
    "cca2": "FJ"
  },
  {
    "cca2": "LI"
  },
  {
    "cca2": "NP"
  },
  {
    "cca2": "PR"
  },
  {
    "cca2": "GE"
  },
  {
    "cca2": "PK"
  },
  {
    "cca2": "MC"
  },
  {
    "cca2": "BW"
  },
  {
    "cca2": "LB"
  },
  {
    "cca2": "PG"
  },
  {
    "cca2": "YT"
  },
  {
    "cca2": "DO"
  },
  {
    "cca2": "NF"
  },
  {
    "cca2": "BV"
  },
  {
    "cca2": "QA"
  },
  {
    "cca2": "MG"
  },
  {
    "cca2": "IN"
  },
  {
    "cca2": "SY"
  },
  {
    "cca2": "ME"
  },
  {
    "cca2": "SZ"
  },
  {
    "cca2": "PY"
  },
  {
    "cca2": "SV"
  },
  {
    "cca2": "UA"
  },
  {
    "cca2": "IM"
  },
  {
    "cca2": "NA"
  },
  {
    "cca2": "AE"
  },
  {
    "cca2": "BG"
  },
  {
    "cca2": "GL"
  },
  {
    "cca2": "DE"
  },
  {
    "cca2": "KH"
  },
  {
    "cca2": "IQ"
  },
  {
    "cca2": "TF"
  },
  {
    "cca2": "SE"
  },
  {
    "cca2": "CU"
  },
  {
    "cca2": "KG"
  },
  {
    "cca2": "RU"
  },
  {
    "cca2": "MY"
  },
  {
    "cca2": "ST"
  },
  {
    "cca2": "CY"
  },
  {
    "cca2": "CA"
  },
  {
    "cca2": "MW"
  },
  {
    "cca2": "SA"
  },
  {
    "cca2": "BA"
  },
  {
    "cca2": "ET"
  },
  {
    "cca2": "ES"
  },
  {
    "cca2": "SI"
  },
  {
    "cca2": "OM"
  },
  {
    "cca2": "PM"
  },
  {
    "cca2": "MO"
  },
  {
    "cca2": "SM"
  },
  {
    "cca2": "LS"
  },
  {
    "cca2": "MH"
  },
  {
    "cca2": "SX"
  },
  {
    "cca2": "IS"
  },
  {
    "cca2": "LU"
  },
  {
    "cca2": "AR"
  },
  {
    "cca2": "TC"
  },
  {
    "cca2": "NR"
  },
  {
    "cca2": "CC"
  },
  {
    "cca2": "EH"
  },
  {
    "cca2": "DM"
  },
  {
    "cca2": "CR"
  },
  {
    "cca2": "AU"
  },
  {
    "cca2": "TH"
  },
  {
    "cca2": "HT"
  },
  {
    "cca2": "TV"
  },
  {
    "cca2": "HN"
  },
  {
    "cca2": "GQ"
  },
  {
    "cca2": "LC"
  },
  {
    "cca2": "PF"
  },
  {
    "cca2": "BY"
  },
  {
    "cca2": "LV"
  },
  {
    "cca2": "PW"
  },
  {
    "cca2": "GP"
  },
  {
    "cca2": "PH"
  },
  {
    "cca2": "GI"
  },
  {
    "cca2": "DK"
  },
  {
    "cca2": "CM"
  },
  {
    "cca2": "GN"
  },
  {
    "cca2": "BH"
  },
  {
    "cca2": "SR"
  },
  {
    "cca2": "CD"
  },
  {
    "cca2": "SO"
  },
  {
    "cca2": "CZ"
  },
  {
    "cca2": "NC"
  },
  {
    "cca2": "VU"
  },
  {
    "cca2": "SH"
  },
  {
    "cca2": "TG"
  },
  {
    "cca2": "VG"
  },
  {
    "cca2": "KE"
  },
  {
    "cca2": "NU"
  },
  {
    "cca2": "HM"
  },
  {
    "cca2": "RW"
  },
  {
    "cca2": "EE"
  },
  {
    "cca2": "RO"
  },
  {
    "cca2": "TT"
  },
  {
    "cca2": "GY"
  },
  {
    "cca2": "TL"
  },
  {
    "cca2": "VN"
  },
  {
    "cca2": "UY"
  },
  {
    "cca2": "VA"
  },
  {
    "cca2": "HK"
  },
  {
    "cca2": "AT"
  },
  {
    "cca2": "AG"
  },
  {
    "cca2": "TM"
  },
  {
    "cca2": "MZ"
  },
  {
    "cca2": "PA"
  },
  {
    "cca2": "FM"
  },
  {
    "cca2": "IE"
  },
  {
    "cca2": "CW"
  },
  {
    "cca2": "GF"
  },
  {
    "cca2": "NO"
  },
  {
    "cca2": "AX"
  },
  {
    "cca2": "CF"
  },
  {
    "cca2": "BF"
  },
  {
    "cca2": "ER"
  },
  {
    "cca2": "TZ"
  },
  {
    "cca2": "KR"
  },
  {
    "cca2": "JO"
  },
  {
    "cca2": "MR"
  },
  {
    "cca2": "LT"
  },
  {
    "cca2": "UM"
  },
  {
    "cca2": "SK"
  },
  {
    "cca2": "AO"
  },
  {
    "cca2": "KZ"
  },
  {
    "cca2": "MD"
  },
  {
    "cca2": "ML"
  },
  {
    "cca2": "FK"
  },
  {
    "cca2": "AM"
  },
  {
    "cca2": "WS"
  },
  {
    "cca2": "JE"
  },
  {
    "cca2": "JP"
  },
  {
    "cca2": "BO"
  },
  {
    "cca2": "CL"
  },
  {
    "cca2": "US"
  },
  {
    "cca2": "VC"
  },
  {
    "cca2": "BM"
  },
  {
    "cca2": "SC"
  },
  {
    "cca2": "IO"
  },
  {
    "cca2": "GT"
  },
  {
    "cca2": "EC"
  },
  {
    "cca2": "MQ"
  },
  {
    "cca2": "TJ"
  },
  {
    "cca2": "MT"
  },
  {
    "cca2": "GM"
  },
  {
    "cca2": "NG"
  },
  {
    "cca2": "BS"
  },
  {
    "cca2": "XK"
  },
  {
    "cca2": "KW"
  },
  {
    "cca2": "MV"
  },
  {
    "cca2": "SS"
  },
  {
    "cca2": "IR"
  },
  {
    "cca2": "AL"
  },
  {
    "cca2": "BR"
  },
  {
    "cca2": "RS"
  },
  {
    "cca2": "BZ"
  },
  {
    "cca2": "MM"
  },
  {
    "cca2": "BT"
  },
  {
    "cca2": "VE"
  },
  {
    "cca2": "LR"
  },
  {
    "cca2": "JM"
  },
  {
    "cca2": "PL"
  },
  {
    "cca2": "KY"
  },
  {
    "cca2": "BN"
  },
  {
    "cca2": "KM"
  },
  {
    "cca2": "GU"
  },
  {
    "cca2": "TO"
  },
  {
    "cca2": "KI"
  },
  {
    "cca2": "GH"
  },
  {
    "cca2": "TD"
  },
  {
    "cca2": "ZW"
  },
  {
    "cca2": "MF"
  },
  {
    "cca2": "MN"
  },
  {
    "cca2": "PT"
  },
  {
    "cca2": "AS"
  },
  {
    "cca2": "CG"
  },
  {
    "cca2": "BE"
  },
  {
    "cca2": "IL"
  },
  {
    "cca2": "NZ"
  },
  {
    "cca2": "NI"
  },
  {
    "cca2": "AI"
  }
];
