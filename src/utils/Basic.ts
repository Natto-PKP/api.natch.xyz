type Case = 'camel' | 'pascal' | 'kebab' | 'snake' | 'upper-snake' | 'upper-kebab' | 'upper-camel' | 'upper-pascal';

export default {
  string: {
    /**
     * Convert a string from one case to another
     * @param str - The string to convert
     * @param from - The case to convert from
     * @param to - The case to convert to
     * @returns The converted string
     */
    ctc: (str: string, from: Case, to: Case) => {
      switch (from) {
        case 'camel':
          switch (to) {
            case 'camel':
              return str;
            case 'pascal':
              return str[0].toUpperCase() + str.slice(1);
            case 'kebab':
              return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
            case 'snake':
              return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
            case 'upper-snake':
              return str.replace(/[A-Z]/g, (letter) => `_${letter}`);
            case 'upper-kebab':
              return str.replace(/[A-Z]/g, (letter) => `-${letter}`);
            case 'upper-camel':
              return str[0].toUpperCase() + str.slice(1);
            case 'upper-pascal':
              return str[0].toUpperCase() + str.slice(1);
          }
        case 'pascal':
          switch (to) {
            case 'camel':
              return str[0].toLowerCase() + str.slice(1);
            case 'pascal':
              return str;
            case 'kebab':
              return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
            case 'snake':
              return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
            case 'upper-snake':
              return str.replace(/[A-Z]/g, (letter) => `_${letter}`);
            case 'upper-kebab':
              return str.replace(/[A-Z]/g, (letter) => `-${letter}`);
            case 'upper-camel':
              return str[0].toUpperCase() + str.slice(1);
            case 'upper-pascal':
              return str[0].toUpperCase() + str.slice(1);
          }
        case 'kebab':
          switch (to) {
            case 'camel':
              return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
            case 'pascal':
              const camel = str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
              return camel[0].toUpperCase() + camel.slice(1);
            case 'kebab':
              return str;
            case 'snake':
              return str.replace(/-/g, '_');
            case 'upper-snake':
              return str.replace(/-/g, '_').toUpperCase();
            case 'upper-kebab':
              return str.toUpperCase();
            case 'upper-camel':
              return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
            case 'upper-pascal':
              const camel2 = str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
              return camel2[0].toUpperCase() + camel2.slice(1);
          }
        case 'snake':
          switch (to) {
            case 'camel':
              return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            case 'pascal':
              const camel = str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
              return camel[0].toUpperCase() + camel.slice(1);
            case 'kebab':
              return str.replace(/_/g, '-');
            case 'snake':
              return str;
            case 'upper-snake':
              return str.toUpperCase();
            case 'upper-kebab':
              return str.replace(/_/g, '-').toUpperCase();
            case 'upper-camel':
              return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            case 'upper-pascal':
              const camel2 = str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
              return camel2[0].toUpperCase() + camel2.slice(1);
          }
        case 'upper-snake':
          switch (to) {
            case 'camel':
              return str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            case 'pascal':
              const camel = str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
              return camel[0].toUpperCase() + camel.slice(1);
            case 'kebab':
              return str.toLowerCase().replace(/_/g, '-');
            case 'snake':
              return str.toLowerCase();
            case 'upper-snake':
              return str;
            case 'upper-kebab':
              return str.replace(/_/g, '-');
            case 'upper-camel':
              return str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            case 'upper-pascal':
              const camel2 = str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
              return camel2[0].toUpperCase() + camel2.slice(1);
          }
        case 'upper-kebab':
          switch (to) {
            case 'camel':
              return str.toLowerCase().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
            case 'pascal':
              const camel = str.toLowerCase().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
              return camel[0].toUpperCase() + camel.slice(1);
            case 'kebab':
              return str.toLowerCase();
            case 'snake':
              return str.toLowerCase().replace(/-/g, '_');
            case 'upper-snake':
              return str.toLowerCase().replace(/-/g, '_').toUpperCase();
            case 'upper-kebab':
              return str.toUpperCase();
            case 'upper-camel':
              return str.toLowerCase().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
            case 'upper-pascal':
              const camel2 = str.toLowerCase().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
              return camel2[0].toUpperCase() + camel2.slice(1);
          }
        case 'upper-camel':
          switch (to) {
            case 'camel':
              return str[0].toLowerCase() + str.slice(1);
            case 'pascal':
              return str;
            case 'kebab':
              return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
            case 'snake':
              return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
            case 'upper-snake':
              return str.replace(/[A-Z]/g, (letter) => `_${letter}`);
            case 'upper-kebab':
              return str.replace(/[A-Z]/g, (letter) => `-${letter}`);
            case 'upper-camel':
              return str;
            case 'upper-pascal':
              return str[0].toUpperCase() + str.slice(1);
          }

        case 'upper-pascal':
          switch (to) {
            case 'camel':
              return str[0].toLowerCase() + str.slice(1);
            case 'pascal':
              return str;
            case 'kebab':
              return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
            case 'snake':
              return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
            case 'upper-snake':
              return str.replace(/[A-Z]/g, (letter) => `_${letter}`);
            case 'upper-kebab':
              return str.replace(/[A-Z]/g, (letter) => `-${letter}`);
            case 'upper-camel':
              return str;
            case 'upper-pascal':
              return str;
          }
      }
    },
  },
};
