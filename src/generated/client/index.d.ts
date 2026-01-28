
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model ScrapItem
 * 
 */
export type ScrapItem = $Result.DefaultSelection<Prisma.$ScrapItemPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  SELLER: 'SELLER',
  COLLECTOR: 'COLLECTOR',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ItemStatus: {
  ACTIVE: 'ACTIVE',
  RESERVED: 'RESERVED',
  COLLECTED: 'COLLECTED',
  CANCELLED: 'CANCELLED'
};

export type ItemStatus = (typeof ItemStatus)[keyof typeof ItemStatus]


export const WasteType: {
  PLASTIC: 'PLASTIC',
  METAL: 'METAL',
  PAPER: 'PAPER',
  E_WASTE: 'E_WASTE',
  MIXED: 'MIXED'
};

export type WasteType = (typeof WasteType)[keyof typeof WasteType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ItemStatus = $Enums.ItemStatus

export const ItemStatus: typeof $Enums.ItemStatus

export type WasteType = $Enums.WasteType

export const WasteType: typeof $Enums.WasteType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scrapItem`: Exposes CRUD operations for the **ScrapItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScrapItems
    * const scrapItems = await prisma.scrapItem.findMany()
    * ```
    */
  get scrapItem(): Prisma.ScrapItemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.2.1
   * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Profile: 'Profile',
    ScrapItem: 'ScrapItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "profile" | "scrapItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      ScrapItem: {
        payload: Prisma.$ScrapItemPayload<ExtArgs>
        fields: Prisma.ScrapItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScrapItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScrapItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload>
          }
          findFirst: {
            args: Prisma.ScrapItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScrapItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload>
          }
          findMany: {
            args: Prisma.ScrapItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload>[]
          }
          create: {
            args: Prisma.ScrapItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload>
          }
          createMany: {
            args: Prisma.ScrapItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScrapItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload>[]
          }
          delete: {
            args: Prisma.ScrapItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload>
          }
          update: {
            args: Prisma.ScrapItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload>
          }
          deleteMany: {
            args: Prisma.ScrapItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScrapItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScrapItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload>[]
          }
          upsert: {
            args: Prisma.ScrapItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapItemPayload>
          }
          aggregate: {
            args: Prisma.ScrapItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScrapItem>
          }
          groupBy: {
            args: Prisma.ScrapItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScrapItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScrapItemCountArgs<ExtArgs>
            result: $Utils.Optional<ScrapItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    profile?: ProfileOmit
    scrapItem?: ScrapItemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    itemsToSell: number
    itemsToCollect: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemsToSell?: boolean | ProfileCountOutputTypeCountItemsToSellArgs
    itemsToCollect?: boolean | ProfileCountOutputTypeCountItemsToCollectArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountItemsToSellArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScrapItemWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountItemsToCollectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScrapItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    operatingRadius: number | null
  }

  export type ProfileSumAggregateOutputType = {
    operatingRadius: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    email: string | null
    fullName: string | null
    phone: string | null
    avatarUrl: string | null
    role: $Enums.UserRole | null
    vehicleType: string | null
    licensePlate: string | null
    operatingRadius: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    email: string | null
    fullName: string | null
    phone: string | null
    avatarUrl: string | null
    role: $Enums.UserRole | null
    vehicleType: string | null
    licensePlate: string | null
    operatingRadius: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    email: number
    fullName: number
    phone: number
    avatarUrl: number
    role: number
    vehicleType: number
    licensePlate: number
    operatingRadius: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    operatingRadius?: true
  }

  export type ProfileSumAggregateInputType = {
    operatingRadius?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    phone?: true
    avatarUrl?: true
    role?: true
    vehicleType?: true
    licensePlate?: true
    operatingRadius?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    phone?: true
    avatarUrl?: true
    role?: true
    vehicleType?: true
    licensePlate?: true
    operatingRadius?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    phone?: true
    avatarUrl?: true
    role?: true
    vehicleType?: true
    licensePlate?: true
    operatingRadius?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    email: string
    fullName: string
    phone: string | null
    avatarUrl: string | null
    role: $Enums.UserRole
    vehicleType: string | null
    licensePlate: string | null
    operatingRadius: number | null
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    avatarUrl?: boolean
    role?: boolean
    vehicleType?: boolean
    licensePlate?: boolean
    operatingRadius?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    itemsToSell?: boolean | Profile$itemsToSellArgs<ExtArgs>
    itemsToCollect?: boolean | Profile$itemsToCollectArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    avatarUrl?: boolean
    role?: boolean
    vehicleType?: boolean
    licensePlate?: boolean
    operatingRadius?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    avatarUrl?: boolean
    role?: boolean
    vehicleType?: boolean
    licensePlate?: boolean
    operatingRadius?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    avatarUrl?: boolean
    role?: boolean
    vehicleType?: boolean
    licensePlate?: boolean
    operatingRadius?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "fullName" | "phone" | "avatarUrl" | "role" | "vehicleType" | "licensePlate" | "operatingRadius" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemsToSell?: boolean | Profile$itemsToSellArgs<ExtArgs>
    itemsToCollect?: boolean | Profile$itemsToCollectArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      itemsToSell: Prisma.$ScrapItemPayload<ExtArgs>[]
      itemsToCollect: Prisma.$ScrapItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      fullName: string
      phone: string | null
      avatarUrl: string | null
      role: $Enums.UserRole
      vehicleType: string | null
      licensePlate: string | null
      operatingRadius: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itemsToSell<T extends Profile$itemsToSellArgs<ExtArgs> = {}>(args?: Subset<T, Profile$itemsToSellArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    itemsToCollect<T extends Profile$itemsToCollectArgs<ExtArgs> = {}>(args?: Subset<T, Profile$itemsToCollectArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */ 
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly fullName: FieldRef<"Profile", 'String'>
    readonly phone: FieldRef<"Profile", 'String'>
    readonly avatarUrl: FieldRef<"Profile", 'String'>
    readonly role: FieldRef<"Profile", 'UserRole'>
    readonly vehicleType: FieldRef<"Profile", 'String'>
    readonly licensePlate: FieldRef<"Profile", 'String'>
    readonly operatingRadius: FieldRef<"Profile", 'Float'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile.itemsToSell
   */
  export type Profile$itemsToSellArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    where?: ScrapItemWhereInput
    orderBy?: ScrapItemOrderByWithRelationInput | ScrapItemOrderByWithRelationInput[]
    cursor?: ScrapItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScrapItemScalarFieldEnum | ScrapItemScalarFieldEnum[]
  }

  /**
   * Profile.itemsToCollect
   */
  export type Profile$itemsToCollectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    where?: ScrapItemWhereInput
    orderBy?: ScrapItemOrderByWithRelationInput | ScrapItemOrderByWithRelationInput[]
    cursor?: ScrapItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScrapItemScalarFieldEnum | ScrapItemScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model ScrapItem
   */

  export type AggregateScrapItem = {
    _count: ScrapItemCountAggregateOutputType | null
    _avg: ScrapItemAvgAggregateOutputType | null
    _sum: ScrapItemSumAggregateOutputType | null
    _min: ScrapItemMinAggregateOutputType | null
    _max: ScrapItemMaxAggregateOutputType | null
  }

  export type ScrapItemAvgAggregateOutputType = {
    estimatedWeight: number | null
    latitude: number | null
    longitude: number | null
  }

  export type ScrapItemSumAggregateOutputType = {
    estimatedWeight: number | null
    latitude: number | null
    longitude: number | null
  }

  export type ScrapItemMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    wasteType: $Enums.WasteType | null
    estimatedWeight: number | null
    imageUrl: string | null
    latitude: number | null
    longitude: number | null
    address: string | null
    status: $Enums.ItemStatus | null
    pickupTime: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    sellerId: string | null
    collectorId: string | null
  }

  export type ScrapItemMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    wasteType: $Enums.WasteType | null
    estimatedWeight: number | null
    imageUrl: string | null
    latitude: number | null
    longitude: number | null
    address: string | null
    status: $Enums.ItemStatus | null
    pickupTime: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    sellerId: string | null
    collectorId: string | null
  }

  export type ScrapItemCountAggregateOutputType = {
    id: number
    title: number
    description: number
    wasteType: number
    estimatedWeight: number
    imageUrl: number
    latitude: number
    longitude: number
    address: number
    status: number
    pickupTime: number
    completedAt: number
    createdAt: number
    updatedAt: number
    sellerId: number
    collectorId: number
    _all: number
  }


  export type ScrapItemAvgAggregateInputType = {
    estimatedWeight?: true
    latitude?: true
    longitude?: true
  }

  export type ScrapItemSumAggregateInputType = {
    estimatedWeight?: true
    latitude?: true
    longitude?: true
  }

  export type ScrapItemMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    wasteType?: true
    estimatedWeight?: true
    imageUrl?: true
    latitude?: true
    longitude?: true
    address?: true
    status?: true
    pickupTime?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    sellerId?: true
    collectorId?: true
  }

  export type ScrapItemMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    wasteType?: true
    estimatedWeight?: true
    imageUrl?: true
    latitude?: true
    longitude?: true
    address?: true
    status?: true
    pickupTime?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    sellerId?: true
    collectorId?: true
  }

  export type ScrapItemCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    wasteType?: true
    estimatedWeight?: true
    imageUrl?: true
    latitude?: true
    longitude?: true
    address?: true
    status?: true
    pickupTime?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    sellerId?: true
    collectorId?: true
    _all?: true
  }

  export type ScrapItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScrapItem to aggregate.
     */
    where?: ScrapItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapItems to fetch.
     */
    orderBy?: ScrapItemOrderByWithRelationInput | ScrapItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScrapItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScrapItems
    **/
    _count?: true | ScrapItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScrapItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScrapItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScrapItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScrapItemMaxAggregateInputType
  }

  export type GetScrapItemAggregateType<T extends ScrapItemAggregateArgs> = {
        [P in keyof T & keyof AggregateScrapItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScrapItem[P]>
      : GetScalarType<T[P], AggregateScrapItem[P]>
  }




  export type ScrapItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScrapItemWhereInput
    orderBy?: ScrapItemOrderByWithAggregationInput | ScrapItemOrderByWithAggregationInput[]
    by: ScrapItemScalarFieldEnum[] | ScrapItemScalarFieldEnum
    having?: ScrapItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScrapItemCountAggregateInputType | true
    _avg?: ScrapItemAvgAggregateInputType
    _sum?: ScrapItemSumAggregateInputType
    _min?: ScrapItemMinAggregateInputType
    _max?: ScrapItemMaxAggregateInputType
  }

  export type ScrapItemGroupByOutputType = {
    id: string
    title: string
    description: string | null
    wasteType: $Enums.WasteType
    estimatedWeight: number
    imageUrl: string
    latitude: number
    longitude: number
    address: string
    status: $Enums.ItemStatus
    pickupTime: Date | null
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    sellerId: string
    collectorId: string | null
    _count: ScrapItemCountAggregateOutputType | null
    _avg: ScrapItemAvgAggregateOutputType | null
    _sum: ScrapItemSumAggregateOutputType | null
    _min: ScrapItemMinAggregateOutputType | null
    _max: ScrapItemMaxAggregateOutputType | null
  }

  type GetScrapItemGroupByPayload<T extends ScrapItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScrapItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScrapItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScrapItemGroupByOutputType[P]>
            : GetScalarType<T[P], ScrapItemGroupByOutputType[P]>
        }
      >
    >


  export type ScrapItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    wasteType?: boolean
    estimatedWeight?: boolean
    imageUrl?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    status?: boolean
    pickupTime?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sellerId?: boolean
    collectorId?: boolean
    seller?: boolean | ProfileDefaultArgs<ExtArgs>
    collector?: boolean | ScrapItem$collectorArgs<ExtArgs>
  }, ExtArgs["result"]["scrapItem"]>

  export type ScrapItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    wasteType?: boolean
    estimatedWeight?: boolean
    imageUrl?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    status?: boolean
    pickupTime?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sellerId?: boolean
    collectorId?: boolean
    seller?: boolean | ProfileDefaultArgs<ExtArgs>
    collector?: boolean | ScrapItem$collectorArgs<ExtArgs>
  }, ExtArgs["result"]["scrapItem"]>

  export type ScrapItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    wasteType?: boolean
    estimatedWeight?: boolean
    imageUrl?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    status?: boolean
    pickupTime?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sellerId?: boolean
    collectorId?: boolean
    seller?: boolean | ProfileDefaultArgs<ExtArgs>
    collector?: boolean | ScrapItem$collectorArgs<ExtArgs>
  }, ExtArgs["result"]["scrapItem"]>

  export type ScrapItemSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    wasteType?: boolean
    estimatedWeight?: boolean
    imageUrl?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    status?: boolean
    pickupTime?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sellerId?: boolean
    collectorId?: boolean
  }

  export type ScrapItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "wasteType" | "estimatedWeight" | "imageUrl" | "latitude" | "longitude" | "address" | "status" | "pickupTime" | "completedAt" | "createdAt" | "updatedAt" | "sellerId" | "collectorId", ExtArgs["result"]["scrapItem"]>
  export type ScrapItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | ProfileDefaultArgs<ExtArgs>
    collector?: boolean | ScrapItem$collectorArgs<ExtArgs>
  }
  export type ScrapItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | ProfileDefaultArgs<ExtArgs>
    collector?: boolean | ScrapItem$collectorArgs<ExtArgs>
  }
  export type ScrapItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | ProfileDefaultArgs<ExtArgs>
    collector?: boolean | ScrapItem$collectorArgs<ExtArgs>
  }

  export type $ScrapItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScrapItem"
    objects: {
      seller: Prisma.$ProfilePayload<ExtArgs>
      collector: Prisma.$ProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      wasteType: $Enums.WasteType
      estimatedWeight: number
      imageUrl: string
      latitude: number
      longitude: number
      address: string
      status: $Enums.ItemStatus
      pickupTime: Date | null
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
      sellerId: string
      collectorId: string | null
    }, ExtArgs["result"]["scrapItem"]>
    composites: {}
  }

  type ScrapItemGetPayload<S extends boolean | null | undefined | ScrapItemDefaultArgs> = $Result.GetResult<Prisma.$ScrapItemPayload, S>

  type ScrapItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScrapItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScrapItemCountAggregateInputType | true
    }

  export interface ScrapItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScrapItem'], meta: { name: 'ScrapItem' } }
    /**
     * Find zero or one ScrapItem that matches the filter.
     * @param {ScrapItemFindUniqueArgs} args - Arguments to find a ScrapItem
     * @example
     * // Get one ScrapItem
     * const scrapItem = await prisma.scrapItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScrapItemFindUniqueArgs>(args: SelectSubset<T, ScrapItemFindUniqueArgs<ExtArgs>>): Prisma__ScrapItemClient<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ScrapItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScrapItemFindUniqueOrThrowArgs} args - Arguments to find a ScrapItem
     * @example
     * // Get one ScrapItem
     * const scrapItem = await prisma.scrapItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScrapItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ScrapItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScrapItemClient<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ScrapItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapItemFindFirstArgs} args - Arguments to find a ScrapItem
     * @example
     * // Get one ScrapItem
     * const scrapItem = await prisma.scrapItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScrapItemFindFirstArgs>(args?: SelectSubset<T, ScrapItemFindFirstArgs<ExtArgs>>): Prisma__ScrapItemClient<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ScrapItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapItemFindFirstOrThrowArgs} args - Arguments to find a ScrapItem
     * @example
     * // Get one ScrapItem
     * const scrapItem = await prisma.scrapItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScrapItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ScrapItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScrapItemClient<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ScrapItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScrapItems
     * const scrapItems = await prisma.scrapItem.findMany()
     * 
     * // Get first 10 ScrapItems
     * const scrapItems = await prisma.scrapItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scrapItemWithIdOnly = await prisma.scrapItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScrapItemFindManyArgs>(args?: SelectSubset<T, ScrapItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ScrapItem.
     * @param {ScrapItemCreateArgs} args - Arguments to create a ScrapItem.
     * @example
     * // Create one ScrapItem
     * const ScrapItem = await prisma.scrapItem.create({
     *   data: {
     *     // ... data to create a ScrapItem
     *   }
     * })
     * 
     */
    create<T extends ScrapItemCreateArgs>(args: SelectSubset<T, ScrapItemCreateArgs<ExtArgs>>): Prisma__ScrapItemClient<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ScrapItems.
     * @param {ScrapItemCreateManyArgs} args - Arguments to create many ScrapItems.
     * @example
     * // Create many ScrapItems
     * const scrapItem = await prisma.scrapItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScrapItemCreateManyArgs>(args?: SelectSubset<T, ScrapItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScrapItems and returns the data saved in the database.
     * @param {ScrapItemCreateManyAndReturnArgs} args - Arguments to create many ScrapItems.
     * @example
     * // Create many ScrapItems
     * const scrapItem = await prisma.scrapItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScrapItems and only return the `id`
     * const scrapItemWithIdOnly = await prisma.scrapItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScrapItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ScrapItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ScrapItem.
     * @param {ScrapItemDeleteArgs} args - Arguments to delete one ScrapItem.
     * @example
     * // Delete one ScrapItem
     * const ScrapItem = await prisma.scrapItem.delete({
     *   where: {
     *     // ... filter to delete one ScrapItem
     *   }
     * })
     * 
     */
    delete<T extends ScrapItemDeleteArgs>(args: SelectSubset<T, ScrapItemDeleteArgs<ExtArgs>>): Prisma__ScrapItemClient<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ScrapItem.
     * @param {ScrapItemUpdateArgs} args - Arguments to update one ScrapItem.
     * @example
     * // Update one ScrapItem
     * const scrapItem = await prisma.scrapItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScrapItemUpdateArgs>(args: SelectSubset<T, ScrapItemUpdateArgs<ExtArgs>>): Prisma__ScrapItemClient<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ScrapItems.
     * @param {ScrapItemDeleteManyArgs} args - Arguments to filter ScrapItems to delete.
     * @example
     * // Delete a few ScrapItems
     * const { count } = await prisma.scrapItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScrapItemDeleteManyArgs>(args?: SelectSubset<T, ScrapItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScrapItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScrapItems
     * const scrapItem = await prisma.scrapItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScrapItemUpdateManyArgs>(args: SelectSubset<T, ScrapItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScrapItems and returns the data updated in the database.
     * @param {ScrapItemUpdateManyAndReturnArgs} args - Arguments to update many ScrapItems.
     * @example
     * // Update many ScrapItems
     * const scrapItem = await prisma.scrapItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScrapItems and only return the `id`
     * const scrapItemWithIdOnly = await prisma.scrapItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScrapItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ScrapItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ScrapItem.
     * @param {ScrapItemUpsertArgs} args - Arguments to update or create a ScrapItem.
     * @example
     * // Update or create a ScrapItem
     * const scrapItem = await prisma.scrapItem.upsert({
     *   create: {
     *     // ... data to create a ScrapItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScrapItem we want to update
     *   }
     * })
     */
    upsert<T extends ScrapItemUpsertArgs>(args: SelectSubset<T, ScrapItemUpsertArgs<ExtArgs>>): Prisma__ScrapItemClient<$Result.GetResult<Prisma.$ScrapItemPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ScrapItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapItemCountArgs} args - Arguments to filter ScrapItems to count.
     * @example
     * // Count the number of ScrapItems
     * const count = await prisma.scrapItem.count({
     *   where: {
     *     // ... the filter for the ScrapItems we want to count
     *   }
     * })
    **/
    count<T extends ScrapItemCountArgs>(
      args?: Subset<T, ScrapItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScrapItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScrapItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScrapItemAggregateArgs>(args: Subset<T, ScrapItemAggregateArgs>): Prisma.PrismaPromise<GetScrapItemAggregateType<T>>

    /**
     * Group by ScrapItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScrapItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScrapItemGroupByArgs['orderBy'] }
        : { orderBy?: ScrapItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScrapItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScrapItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScrapItem model
   */
  readonly fields: ScrapItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScrapItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScrapItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seller<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    collector<T extends ScrapItem$collectorArgs<ExtArgs> = {}>(args?: Subset<T, ScrapItem$collectorArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScrapItem model
   */ 
  interface ScrapItemFieldRefs {
    readonly id: FieldRef<"ScrapItem", 'String'>
    readonly title: FieldRef<"ScrapItem", 'String'>
    readonly description: FieldRef<"ScrapItem", 'String'>
    readonly wasteType: FieldRef<"ScrapItem", 'WasteType'>
    readonly estimatedWeight: FieldRef<"ScrapItem", 'Float'>
    readonly imageUrl: FieldRef<"ScrapItem", 'String'>
    readonly latitude: FieldRef<"ScrapItem", 'Float'>
    readonly longitude: FieldRef<"ScrapItem", 'Float'>
    readonly address: FieldRef<"ScrapItem", 'String'>
    readonly status: FieldRef<"ScrapItem", 'ItemStatus'>
    readonly pickupTime: FieldRef<"ScrapItem", 'DateTime'>
    readonly completedAt: FieldRef<"ScrapItem", 'DateTime'>
    readonly createdAt: FieldRef<"ScrapItem", 'DateTime'>
    readonly updatedAt: FieldRef<"ScrapItem", 'DateTime'>
    readonly sellerId: FieldRef<"ScrapItem", 'String'>
    readonly collectorId: FieldRef<"ScrapItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ScrapItem findUnique
   */
  export type ScrapItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    /**
     * Filter, which ScrapItem to fetch.
     */
    where: ScrapItemWhereUniqueInput
  }

  /**
   * ScrapItem findUniqueOrThrow
   */
  export type ScrapItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    /**
     * Filter, which ScrapItem to fetch.
     */
    where: ScrapItemWhereUniqueInput
  }

  /**
   * ScrapItem findFirst
   */
  export type ScrapItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    /**
     * Filter, which ScrapItem to fetch.
     */
    where?: ScrapItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapItems to fetch.
     */
    orderBy?: ScrapItemOrderByWithRelationInput | ScrapItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScrapItems.
     */
    cursor?: ScrapItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScrapItems.
     */
    distinct?: ScrapItemScalarFieldEnum | ScrapItemScalarFieldEnum[]
  }

  /**
   * ScrapItem findFirstOrThrow
   */
  export type ScrapItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    /**
     * Filter, which ScrapItem to fetch.
     */
    where?: ScrapItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapItems to fetch.
     */
    orderBy?: ScrapItemOrderByWithRelationInput | ScrapItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScrapItems.
     */
    cursor?: ScrapItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScrapItems.
     */
    distinct?: ScrapItemScalarFieldEnum | ScrapItemScalarFieldEnum[]
  }

  /**
   * ScrapItem findMany
   */
  export type ScrapItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    /**
     * Filter, which ScrapItems to fetch.
     */
    where?: ScrapItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapItems to fetch.
     */
    orderBy?: ScrapItemOrderByWithRelationInput | ScrapItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScrapItems.
     */
    cursor?: ScrapItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapItems.
     */
    skip?: number
    distinct?: ScrapItemScalarFieldEnum | ScrapItemScalarFieldEnum[]
  }

  /**
   * ScrapItem create
   */
  export type ScrapItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ScrapItem.
     */
    data: XOR<ScrapItemCreateInput, ScrapItemUncheckedCreateInput>
  }

  /**
   * ScrapItem createMany
   */
  export type ScrapItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScrapItems.
     */
    data: ScrapItemCreateManyInput | ScrapItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScrapItem createManyAndReturn
   */
  export type ScrapItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * The data used to create many ScrapItems.
     */
    data: ScrapItemCreateManyInput | ScrapItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScrapItem update
   */
  export type ScrapItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ScrapItem.
     */
    data: XOR<ScrapItemUpdateInput, ScrapItemUncheckedUpdateInput>
    /**
     * Choose, which ScrapItem to update.
     */
    where: ScrapItemWhereUniqueInput
  }

  /**
   * ScrapItem updateMany
   */
  export type ScrapItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScrapItems.
     */
    data: XOR<ScrapItemUpdateManyMutationInput, ScrapItemUncheckedUpdateManyInput>
    /**
     * Filter which ScrapItems to update
     */
    where?: ScrapItemWhereInput
  }

  /**
   * ScrapItem updateManyAndReturn
   */
  export type ScrapItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * The data used to update ScrapItems.
     */
    data: XOR<ScrapItemUpdateManyMutationInput, ScrapItemUncheckedUpdateManyInput>
    /**
     * Filter which ScrapItems to update
     */
    where?: ScrapItemWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScrapItem upsert
   */
  export type ScrapItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ScrapItem to update in case it exists.
     */
    where: ScrapItemWhereUniqueInput
    /**
     * In case the ScrapItem found by the `where` argument doesn't exist, create a new ScrapItem with this data.
     */
    create: XOR<ScrapItemCreateInput, ScrapItemUncheckedCreateInput>
    /**
     * In case the ScrapItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScrapItemUpdateInput, ScrapItemUncheckedUpdateInput>
  }

  /**
   * ScrapItem delete
   */
  export type ScrapItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
    /**
     * Filter which ScrapItem to delete.
     */
    where: ScrapItemWhereUniqueInput
  }

  /**
   * ScrapItem deleteMany
   */
  export type ScrapItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScrapItems to delete
     */
    where?: ScrapItemWhereInput
  }

  /**
   * ScrapItem.collector
   */
  export type ScrapItem$collectorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * ScrapItem without action
   */
  export type ScrapItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapItem
     */
    select?: ScrapItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapItem
     */
    omit?: ScrapItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScrapItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    email: 'email',
    fullName: 'fullName',
    phone: 'phone',
    avatarUrl: 'avatarUrl',
    role: 'role',
    vehicleType: 'vehicleType',
    licensePlate: 'licensePlate',
    operatingRadius: 'operatingRadius',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const ScrapItemScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    wasteType: 'wasteType',
    estimatedWeight: 'estimatedWeight',
    imageUrl: 'imageUrl',
    latitude: 'latitude',
    longitude: 'longitude',
    address: 'address',
    status: 'status',
    pickupTime: 'pickupTime',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sellerId: 'sellerId',
    collectorId: 'collectorId'
  };

  export type ScrapItemScalarFieldEnum = (typeof ScrapItemScalarFieldEnum)[keyof typeof ScrapItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'WasteType'
   */
  export type EnumWasteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WasteType'>
    


  /**
   * Reference to a field of type 'WasteType[]'
   */
  export type ListEnumWasteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WasteType[]'>
    


  /**
   * Reference to a field of type 'ItemStatus'
   */
  export type EnumItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemStatus'>
    


  /**
   * Reference to a field of type 'ItemStatus[]'
   */
  export type ListEnumItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    email?: StringFilter<"Profile"> | string
    fullName?: StringFilter<"Profile"> | string
    phone?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    role?: EnumUserRoleFilter<"Profile"> | $Enums.UserRole
    vehicleType?: StringNullableFilter<"Profile"> | string | null
    licensePlate?: StringNullableFilter<"Profile"> | string | null
    operatingRadius?: FloatNullableFilter<"Profile"> | number | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    itemsToSell?: ScrapItemListRelationFilter
    itemsToCollect?: ScrapItemListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    vehicleType?: SortOrderInput | SortOrder
    licensePlate?: SortOrderInput | SortOrder
    operatingRadius?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    itemsToSell?: ScrapItemOrderByRelationAggregateInput
    itemsToCollect?: ScrapItemOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    fullName?: StringFilter<"Profile"> | string
    phone?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    role?: EnumUserRoleFilter<"Profile"> | $Enums.UserRole
    vehicleType?: StringNullableFilter<"Profile"> | string | null
    licensePlate?: StringNullableFilter<"Profile"> | string | null
    operatingRadius?: FloatNullableFilter<"Profile"> | number | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    itemsToSell?: ScrapItemListRelationFilter
    itemsToCollect?: ScrapItemListRelationFilter
  }, "id" | "email">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    vehicleType?: SortOrderInput | SortOrder
    licensePlate?: SortOrderInput | SortOrder
    operatingRadius?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    email?: StringWithAggregatesFilter<"Profile"> | string
    fullName?: StringWithAggregatesFilter<"Profile"> | string
    phone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"Profile"> | $Enums.UserRole
    vehicleType?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    licensePlate?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    operatingRadius?: FloatNullableWithAggregatesFilter<"Profile"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type ScrapItemWhereInput = {
    AND?: ScrapItemWhereInput | ScrapItemWhereInput[]
    OR?: ScrapItemWhereInput[]
    NOT?: ScrapItemWhereInput | ScrapItemWhereInput[]
    id?: StringFilter<"ScrapItem"> | string
    title?: StringFilter<"ScrapItem"> | string
    description?: StringNullableFilter<"ScrapItem"> | string | null
    wasteType?: EnumWasteTypeFilter<"ScrapItem"> | $Enums.WasteType
    estimatedWeight?: FloatFilter<"ScrapItem"> | number
    imageUrl?: StringFilter<"ScrapItem"> | string
    latitude?: FloatFilter<"ScrapItem"> | number
    longitude?: FloatFilter<"ScrapItem"> | number
    address?: StringFilter<"ScrapItem"> | string
    status?: EnumItemStatusFilter<"ScrapItem"> | $Enums.ItemStatus
    pickupTime?: DateTimeNullableFilter<"ScrapItem"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"ScrapItem"> | Date | string | null
    createdAt?: DateTimeFilter<"ScrapItem"> | Date | string
    updatedAt?: DateTimeFilter<"ScrapItem"> | Date | string
    sellerId?: StringFilter<"ScrapItem"> | string
    collectorId?: StringNullableFilter<"ScrapItem"> | string | null
    seller?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    collector?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
  }

  export type ScrapItemOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    wasteType?: SortOrder
    estimatedWeight?: SortOrder
    imageUrl?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    status?: SortOrder
    pickupTime?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sellerId?: SortOrder
    collectorId?: SortOrderInput | SortOrder
    seller?: ProfileOrderByWithRelationInput
    collector?: ProfileOrderByWithRelationInput
  }

  export type ScrapItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScrapItemWhereInput | ScrapItemWhereInput[]
    OR?: ScrapItemWhereInput[]
    NOT?: ScrapItemWhereInput | ScrapItemWhereInput[]
    title?: StringFilter<"ScrapItem"> | string
    description?: StringNullableFilter<"ScrapItem"> | string | null
    wasteType?: EnumWasteTypeFilter<"ScrapItem"> | $Enums.WasteType
    estimatedWeight?: FloatFilter<"ScrapItem"> | number
    imageUrl?: StringFilter<"ScrapItem"> | string
    latitude?: FloatFilter<"ScrapItem"> | number
    longitude?: FloatFilter<"ScrapItem"> | number
    address?: StringFilter<"ScrapItem"> | string
    status?: EnumItemStatusFilter<"ScrapItem"> | $Enums.ItemStatus
    pickupTime?: DateTimeNullableFilter<"ScrapItem"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"ScrapItem"> | Date | string | null
    createdAt?: DateTimeFilter<"ScrapItem"> | Date | string
    updatedAt?: DateTimeFilter<"ScrapItem"> | Date | string
    sellerId?: StringFilter<"ScrapItem"> | string
    collectorId?: StringNullableFilter<"ScrapItem"> | string | null
    seller?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    collector?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
  }, "id">

  export type ScrapItemOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    wasteType?: SortOrder
    estimatedWeight?: SortOrder
    imageUrl?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    status?: SortOrder
    pickupTime?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sellerId?: SortOrder
    collectorId?: SortOrderInput | SortOrder
    _count?: ScrapItemCountOrderByAggregateInput
    _avg?: ScrapItemAvgOrderByAggregateInput
    _max?: ScrapItemMaxOrderByAggregateInput
    _min?: ScrapItemMinOrderByAggregateInput
    _sum?: ScrapItemSumOrderByAggregateInput
  }

  export type ScrapItemScalarWhereWithAggregatesInput = {
    AND?: ScrapItemScalarWhereWithAggregatesInput | ScrapItemScalarWhereWithAggregatesInput[]
    OR?: ScrapItemScalarWhereWithAggregatesInput[]
    NOT?: ScrapItemScalarWhereWithAggregatesInput | ScrapItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScrapItem"> | string
    title?: StringWithAggregatesFilter<"ScrapItem"> | string
    description?: StringNullableWithAggregatesFilter<"ScrapItem"> | string | null
    wasteType?: EnumWasteTypeWithAggregatesFilter<"ScrapItem"> | $Enums.WasteType
    estimatedWeight?: FloatWithAggregatesFilter<"ScrapItem"> | number
    imageUrl?: StringWithAggregatesFilter<"ScrapItem"> | string
    latitude?: FloatWithAggregatesFilter<"ScrapItem"> | number
    longitude?: FloatWithAggregatesFilter<"ScrapItem"> | number
    address?: StringWithAggregatesFilter<"ScrapItem"> | string
    status?: EnumItemStatusWithAggregatesFilter<"ScrapItem"> | $Enums.ItemStatus
    pickupTime?: DateTimeNullableWithAggregatesFilter<"ScrapItem"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"ScrapItem"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ScrapItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ScrapItem"> | Date | string
    sellerId?: StringWithAggregatesFilter<"ScrapItem"> | string
    collectorId?: StringNullableWithAggregatesFilter<"ScrapItem"> | string | null
  }

  export type ProfileCreateInput = {
    id: string
    email: string
    fullName: string
    phone?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    vehicleType?: string | null
    licensePlate?: string | null
    operatingRadius?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsToSell?: ScrapItemCreateNestedManyWithoutSellerInput
    itemsToCollect?: ScrapItemCreateNestedManyWithoutCollectorInput
  }

  export type ProfileUncheckedCreateInput = {
    id: string
    email: string
    fullName: string
    phone?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    vehicleType?: string | null
    licensePlate?: string | null
    operatingRadius?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsToSell?: ScrapItemUncheckedCreateNestedManyWithoutSellerInput
    itemsToCollect?: ScrapItemUncheckedCreateNestedManyWithoutCollectorInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    licensePlate?: NullableStringFieldUpdateOperationsInput | string | null
    operatingRadius?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsToSell?: ScrapItemUpdateManyWithoutSellerNestedInput
    itemsToCollect?: ScrapItemUpdateManyWithoutCollectorNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    licensePlate?: NullableStringFieldUpdateOperationsInput | string | null
    operatingRadius?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsToSell?: ScrapItemUncheckedUpdateManyWithoutSellerNestedInput
    itemsToCollect?: ScrapItemUncheckedUpdateManyWithoutCollectorNestedInput
  }

  export type ProfileCreateManyInput = {
    id: string
    email: string
    fullName: string
    phone?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    vehicleType?: string | null
    licensePlate?: string | null
    operatingRadius?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    licensePlate?: NullableStringFieldUpdateOperationsInput | string | null
    operatingRadius?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    licensePlate?: NullableStringFieldUpdateOperationsInput | string | null
    operatingRadius?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScrapItemCreateInput = {
    id?: string
    title: string
    description?: string | null
    wasteType: $Enums.WasteType
    estimatedWeight: number
    imageUrl: string
    latitude: number
    longitude: number
    address: string
    status?: $Enums.ItemStatus
    pickupTime?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: ProfileCreateNestedOneWithoutItemsToSellInput
    collector?: ProfileCreateNestedOneWithoutItemsToCollectInput
  }

  export type ScrapItemUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    wasteType: $Enums.WasteType
    estimatedWeight: number
    imageUrl: string
    latitude: number
    longitude: number
    address: string
    status?: $Enums.ItemStatus
    pickupTime?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sellerId: string
    collectorId?: string | null
  }

  export type ScrapItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    wasteType?: EnumWasteTypeFieldUpdateOperationsInput | $Enums.WasteType
    estimatedWeight?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: ProfileUpdateOneRequiredWithoutItemsToSellNestedInput
    collector?: ProfileUpdateOneWithoutItemsToCollectNestedInput
  }

  export type ScrapItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    wasteType?: EnumWasteTypeFieldUpdateOperationsInput | $Enums.WasteType
    estimatedWeight?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sellerId?: StringFieldUpdateOperationsInput | string
    collectorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScrapItemCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    wasteType: $Enums.WasteType
    estimatedWeight: number
    imageUrl: string
    latitude: number
    longitude: number
    address: string
    status?: $Enums.ItemStatus
    pickupTime?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sellerId: string
    collectorId?: string | null
  }

  export type ScrapItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    wasteType?: EnumWasteTypeFieldUpdateOperationsInput | $Enums.WasteType
    estimatedWeight?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScrapItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    wasteType?: EnumWasteTypeFieldUpdateOperationsInput | $Enums.WasteType
    estimatedWeight?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sellerId?: StringFieldUpdateOperationsInput | string
    collectorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ScrapItemListRelationFilter = {
    every?: ScrapItemWhereInput
    some?: ScrapItemWhereInput
    none?: ScrapItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ScrapItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    vehicleType?: SortOrder
    licensePlate?: SortOrder
    operatingRadius?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    operatingRadius?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    vehicleType?: SortOrder
    licensePlate?: SortOrder
    operatingRadius?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    vehicleType?: SortOrder
    licensePlate?: SortOrder
    operatingRadius?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    operatingRadius?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumWasteTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WasteType | EnumWasteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WasteType[] | ListEnumWasteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WasteType[] | ListEnumWasteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWasteTypeFilter<$PrismaModel> | $Enums.WasteType
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumItemStatusFilter<$PrismaModel> | $Enums.ItemStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type ScrapItemCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    wasteType?: SortOrder
    estimatedWeight?: SortOrder
    imageUrl?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    status?: SortOrder
    pickupTime?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sellerId?: SortOrder
    collectorId?: SortOrder
  }

  export type ScrapItemAvgOrderByAggregateInput = {
    estimatedWeight?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type ScrapItemMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    wasteType?: SortOrder
    estimatedWeight?: SortOrder
    imageUrl?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    status?: SortOrder
    pickupTime?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sellerId?: SortOrder
    collectorId?: SortOrder
  }

  export type ScrapItemMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    wasteType?: SortOrder
    estimatedWeight?: SortOrder
    imageUrl?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    status?: SortOrder
    pickupTime?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sellerId?: SortOrder
    collectorId?: SortOrder
  }

  export type ScrapItemSumOrderByAggregateInput = {
    estimatedWeight?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type EnumWasteTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WasteType | EnumWasteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WasteType[] | ListEnumWasteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WasteType[] | ListEnumWasteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWasteTypeWithAggregatesFilter<$PrismaModel> | $Enums.WasteType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWasteTypeFilter<$PrismaModel>
    _max?: NestedEnumWasteTypeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.ItemStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumItemStatusFilter<$PrismaModel>
    _max?: NestedEnumItemStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ScrapItemCreateNestedManyWithoutSellerInput = {
    create?: XOR<ScrapItemCreateWithoutSellerInput, ScrapItemUncheckedCreateWithoutSellerInput> | ScrapItemCreateWithoutSellerInput[] | ScrapItemUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ScrapItemCreateOrConnectWithoutSellerInput | ScrapItemCreateOrConnectWithoutSellerInput[]
    createMany?: ScrapItemCreateManySellerInputEnvelope
    connect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
  }

  export type ScrapItemCreateNestedManyWithoutCollectorInput = {
    create?: XOR<ScrapItemCreateWithoutCollectorInput, ScrapItemUncheckedCreateWithoutCollectorInput> | ScrapItemCreateWithoutCollectorInput[] | ScrapItemUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: ScrapItemCreateOrConnectWithoutCollectorInput | ScrapItemCreateOrConnectWithoutCollectorInput[]
    createMany?: ScrapItemCreateManyCollectorInputEnvelope
    connect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
  }

  export type ScrapItemUncheckedCreateNestedManyWithoutSellerInput = {
    create?: XOR<ScrapItemCreateWithoutSellerInput, ScrapItemUncheckedCreateWithoutSellerInput> | ScrapItemCreateWithoutSellerInput[] | ScrapItemUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ScrapItemCreateOrConnectWithoutSellerInput | ScrapItemCreateOrConnectWithoutSellerInput[]
    createMany?: ScrapItemCreateManySellerInputEnvelope
    connect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
  }

  export type ScrapItemUncheckedCreateNestedManyWithoutCollectorInput = {
    create?: XOR<ScrapItemCreateWithoutCollectorInput, ScrapItemUncheckedCreateWithoutCollectorInput> | ScrapItemCreateWithoutCollectorInput[] | ScrapItemUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: ScrapItemCreateOrConnectWithoutCollectorInput | ScrapItemCreateOrConnectWithoutCollectorInput[]
    createMany?: ScrapItemCreateManyCollectorInputEnvelope
    connect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ScrapItemUpdateManyWithoutSellerNestedInput = {
    create?: XOR<ScrapItemCreateWithoutSellerInput, ScrapItemUncheckedCreateWithoutSellerInput> | ScrapItemCreateWithoutSellerInput[] | ScrapItemUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ScrapItemCreateOrConnectWithoutSellerInput | ScrapItemCreateOrConnectWithoutSellerInput[]
    upsert?: ScrapItemUpsertWithWhereUniqueWithoutSellerInput | ScrapItemUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: ScrapItemCreateManySellerInputEnvelope
    set?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    disconnect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    delete?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    connect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    update?: ScrapItemUpdateWithWhereUniqueWithoutSellerInput | ScrapItemUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: ScrapItemUpdateManyWithWhereWithoutSellerInput | ScrapItemUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: ScrapItemScalarWhereInput | ScrapItemScalarWhereInput[]
  }

  export type ScrapItemUpdateManyWithoutCollectorNestedInput = {
    create?: XOR<ScrapItemCreateWithoutCollectorInput, ScrapItemUncheckedCreateWithoutCollectorInput> | ScrapItemCreateWithoutCollectorInput[] | ScrapItemUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: ScrapItemCreateOrConnectWithoutCollectorInput | ScrapItemCreateOrConnectWithoutCollectorInput[]
    upsert?: ScrapItemUpsertWithWhereUniqueWithoutCollectorInput | ScrapItemUpsertWithWhereUniqueWithoutCollectorInput[]
    createMany?: ScrapItemCreateManyCollectorInputEnvelope
    set?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    disconnect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    delete?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    connect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    update?: ScrapItemUpdateWithWhereUniqueWithoutCollectorInput | ScrapItemUpdateWithWhereUniqueWithoutCollectorInput[]
    updateMany?: ScrapItemUpdateManyWithWhereWithoutCollectorInput | ScrapItemUpdateManyWithWhereWithoutCollectorInput[]
    deleteMany?: ScrapItemScalarWhereInput | ScrapItemScalarWhereInput[]
  }

  export type ScrapItemUncheckedUpdateManyWithoutSellerNestedInput = {
    create?: XOR<ScrapItemCreateWithoutSellerInput, ScrapItemUncheckedCreateWithoutSellerInput> | ScrapItemCreateWithoutSellerInput[] | ScrapItemUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ScrapItemCreateOrConnectWithoutSellerInput | ScrapItemCreateOrConnectWithoutSellerInput[]
    upsert?: ScrapItemUpsertWithWhereUniqueWithoutSellerInput | ScrapItemUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: ScrapItemCreateManySellerInputEnvelope
    set?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    disconnect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    delete?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    connect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    update?: ScrapItemUpdateWithWhereUniqueWithoutSellerInput | ScrapItemUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: ScrapItemUpdateManyWithWhereWithoutSellerInput | ScrapItemUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: ScrapItemScalarWhereInput | ScrapItemScalarWhereInput[]
  }

  export type ScrapItemUncheckedUpdateManyWithoutCollectorNestedInput = {
    create?: XOR<ScrapItemCreateWithoutCollectorInput, ScrapItemUncheckedCreateWithoutCollectorInput> | ScrapItemCreateWithoutCollectorInput[] | ScrapItemUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: ScrapItemCreateOrConnectWithoutCollectorInput | ScrapItemCreateOrConnectWithoutCollectorInput[]
    upsert?: ScrapItemUpsertWithWhereUniqueWithoutCollectorInput | ScrapItemUpsertWithWhereUniqueWithoutCollectorInput[]
    createMany?: ScrapItemCreateManyCollectorInputEnvelope
    set?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    disconnect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    delete?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    connect?: ScrapItemWhereUniqueInput | ScrapItemWhereUniqueInput[]
    update?: ScrapItemUpdateWithWhereUniqueWithoutCollectorInput | ScrapItemUpdateWithWhereUniqueWithoutCollectorInput[]
    updateMany?: ScrapItemUpdateManyWithWhereWithoutCollectorInput | ScrapItemUpdateManyWithWhereWithoutCollectorInput[]
    deleteMany?: ScrapItemScalarWhereInput | ScrapItemScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutItemsToSellInput = {
    create?: XOR<ProfileCreateWithoutItemsToSellInput, ProfileUncheckedCreateWithoutItemsToSellInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutItemsToSellInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutItemsToCollectInput = {
    create?: XOR<ProfileCreateWithoutItemsToCollectInput, ProfileUncheckedCreateWithoutItemsToCollectInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutItemsToCollectInput
    connect?: ProfileWhereUniqueInput
  }

  export type EnumWasteTypeFieldUpdateOperationsInput = {
    set?: $Enums.WasteType
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumItemStatusFieldUpdateOperationsInput = {
    set?: $Enums.ItemStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProfileUpdateOneRequiredWithoutItemsToSellNestedInput = {
    create?: XOR<ProfileCreateWithoutItemsToSellInput, ProfileUncheckedCreateWithoutItemsToSellInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutItemsToSellInput
    upsert?: ProfileUpsertWithoutItemsToSellInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutItemsToSellInput, ProfileUpdateWithoutItemsToSellInput>, ProfileUncheckedUpdateWithoutItemsToSellInput>
  }

  export type ProfileUpdateOneWithoutItemsToCollectNestedInput = {
    create?: XOR<ProfileCreateWithoutItemsToCollectInput, ProfileUncheckedCreateWithoutItemsToCollectInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutItemsToCollectInput
    upsert?: ProfileUpsertWithoutItemsToCollectInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutItemsToCollectInput, ProfileUpdateWithoutItemsToCollectInput>, ProfileUncheckedUpdateWithoutItemsToCollectInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumWasteTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WasteType | EnumWasteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WasteType[] | ListEnumWasteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WasteType[] | ListEnumWasteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWasteTypeFilter<$PrismaModel> | $Enums.WasteType
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumItemStatusFilter<$PrismaModel> | $Enums.ItemStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumWasteTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WasteType | EnumWasteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WasteType[] | ListEnumWasteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WasteType[] | ListEnumWasteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWasteTypeWithAggregatesFilter<$PrismaModel> | $Enums.WasteType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWasteTypeFilter<$PrismaModel>
    _max?: NestedEnumWasteTypeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.ItemStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumItemStatusFilter<$PrismaModel>
    _max?: NestedEnumItemStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ScrapItemCreateWithoutSellerInput = {
    id?: string
    title: string
    description?: string | null
    wasteType: $Enums.WasteType
    estimatedWeight: number
    imageUrl: string
    latitude: number
    longitude: number
    address: string
    status?: $Enums.ItemStatus
    pickupTime?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    collector?: ProfileCreateNestedOneWithoutItemsToCollectInput
  }

  export type ScrapItemUncheckedCreateWithoutSellerInput = {
    id?: string
    title: string
    description?: string | null
    wasteType: $Enums.WasteType
    estimatedWeight: number
    imageUrl: string
    latitude: number
    longitude: number
    address: string
    status?: $Enums.ItemStatus
    pickupTime?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    collectorId?: string | null
  }

  export type ScrapItemCreateOrConnectWithoutSellerInput = {
    where: ScrapItemWhereUniqueInput
    create: XOR<ScrapItemCreateWithoutSellerInput, ScrapItemUncheckedCreateWithoutSellerInput>
  }

  export type ScrapItemCreateManySellerInputEnvelope = {
    data: ScrapItemCreateManySellerInput | ScrapItemCreateManySellerInput[]
    skipDuplicates?: boolean
  }

  export type ScrapItemCreateWithoutCollectorInput = {
    id?: string
    title: string
    description?: string | null
    wasteType: $Enums.WasteType
    estimatedWeight: number
    imageUrl: string
    latitude: number
    longitude: number
    address: string
    status?: $Enums.ItemStatus
    pickupTime?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: ProfileCreateNestedOneWithoutItemsToSellInput
  }

  export type ScrapItemUncheckedCreateWithoutCollectorInput = {
    id?: string
    title: string
    description?: string | null
    wasteType: $Enums.WasteType
    estimatedWeight: number
    imageUrl: string
    latitude: number
    longitude: number
    address: string
    status?: $Enums.ItemStatus
    pickupTime?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sellerId: string
  }

  export type ScrapItemCreateOrConnectWithoutCollectorInput = {
    where: ScrapItemWhereUniqueInput
    create: XOR<ScrapItemCreateWithoutCollectorInput, ScrapItemUncheckedCreateWithoutCollectorInput>
  }

  export type ScrapItemCreateManyCollectorInputEnvelope = {
    data: ScrapItemCreateManyCollectorInput | ScrapItemCreateManyCollectorInput[]
    skipDuplicates?: boolean
  }

  export type ScrapItemUpsertWithWhereUniqueWithoutSellerInput = {
    where: ScrapItemWhereUniqueInput
    update: XOR<ScrapItemUpdateWithoutSellerInput, ScrapItemUncheckedUpdateWithoutSellerInput>
    create: XOR<ScrapItemCreateWithoutSellerInput, ScrapItemUncheckedCreateWithoutSellerInput>
  }

  export type ScrapItemUpdateWithWhereUniqueWithoutSellerInput = {
    where: ScrapItemWhereUniqueInput
    data: XOR<ScrapItemUpdateWithoutSellerInput, ScrapItemUncheckedUpdateWithoutSellerInput>
  }

  export type ScrapItemUpdateManyWithWhereWithoutSellerInput = {
    where: ScrapItemScalarWhereInput
    data: XOR<ScrapItemUpdateManyMutationInput, ScrapItemUncheckedUpdateManyWithoutSellerInput>
  }

  export type ScrapItemScalarWhereInput = {
    AND?: ScrapItemScalarWhereInput | ScrapItemScalarWhereInput[]
    OR?: ScrapItemScalarWhereInput[]
    NOT?: ScrapItemScalarWhereInput | ScrapItemScalarWhereInput[]
    id?: StringFilter<"ScrapItem"> | string
    title?: StringFilter<"ScrapItem"> | string
    description?: StringNullableFilter<"ScrapItem"> | string | null
    wasteType?: EnumWasteTypeFilter<"ScrapItem"> | $Enums.WasteType
    estimatedWeight?: FloatFilter<"ScrapItem"> | number
    imageUrl?: StringFilter<"ScrapItem"> | string
    latitude?: FloatFilter<"ScrapItem"> | number
    longitude?: FloatFilter<"ScrapItem"> | number
    address?: StringFilter<"ScrapItem"> | string
    status?: EnumItemStatusFilter<"ScrapItem"> | $Enums.ItemStatus
    pickupTime?: DateTimeNullableFilter<"ScrapItem"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"ScrapItem"> | Date | string | null
    createdAt?: DateTimeFilter<"ScrapItem"> | Date | string
    updatedAt?: DateTimeFilter<"ScrapItem"> | Date | string
    sellerId?: StringFilter<"ScrapItem"> | string
    collectorId?: StringNullableFilter<"ScrapItem"> | string | null
  }

  export type ScrapItemUpsertWithWhereUniqueWithoutCollectorInput = {
    where: ScrapItemWhereUniqueInput
    update: XOR<ScrapItemUpdateWithoutCollectorInput, ScrapItemUncheckedUpdateWithoutCollectorInput>
    create: XOR<ScrapItemCreateWithoutCollectorInput, ScrapItemUncheckedCreateWithoutCollectorInput>
  }

  export type ScrapItemUpdateWithWhereUniqueWithoutCollectorInput = {
    where: ScrapItemWhereUniqueInput
    data: XOR<ScrapItemUpdateWithoutCollectorInput, ScrapItemUncheckedUpdateWithoutCollectorInput>
  }

  export type ScrapItemUpdateManyWithWhereWithoutCollectorInput = {
    where: ScrapItemScalarWhereInput
    data: XOR<ScrapItemUpdateManyMutationInput, ScrapItemUncheckedUpdateManyWithoutCollectorInput>
  }

  export type ProfileCreateWithoutItemsToSellInput = {
    id: string
    email: string
    fullName: string
    phone?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    vehicleType?: string | null
    licensePlate?: string | null
    operatingRadius?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsToCollect?: ScrapItemCreateNestedManyWithoutCollectorInput
  }

  export type ProfileUncheckedCreateWithoutItemsToSellInput = {
    id: string
    email: string
    fullName: string
    phone?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    vehicleType?: string | null
    licensePlate?: string | null
    operatingRadius?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsToCollect?: ScrapItemUncheckedCreateNestedManyWithoutCollectorInput
  }

  export type ProfileCreateOrConnectWithoutItemsToSellInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutItemsToSellInput, ProfileUncheckedCreateWithoutItemsToSellInput>
  }

  export type ProfileCreateWithoutItemsToCollectInput = {
    id: string
    email: string
    fullName: string
    phone?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    vehicleType?: string | null
    licensePlate?: string | null
    operatingRadius?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsToSell?: ScrapItemCreateNestedManyWithoutSellerInput
  }

  export type ProfileUncheckedCreateWithoutItemsToCollectInput = {
    id: string
    email: string
    fullName: string
    phone?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    vehicleType?: string | null
    licensePlate?: string | null
    operatingRadius?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsToSell?: ScrapItemUncheckedCreateNestedManyWithoutSellerInput
  }

  export type ProfileCreateOrConnectWithoutItemsToCollectInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutItemsToCollectInput, ProfileUncheckedCreateWithoutItemsToCollectInput>
  }

  export type ProfileUpsertWithoutItemsToSellInput = {
    update: XOR<ProfileUpdateWithoutItemsToSellInput, ProfileUncheckedUpdateWithoutItemsToSellInput>
    create: XOR<ProfileCreateWithoutItemsToSellInput, ProfileUncheckedCreateWithoutItemsToSellInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutItemsToSellInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutItemsToSellInput, ProfileUncheckedUpdateWithoutItemsToSellInput>
  }

  export type ProfileUpdateWithoutItemsToSellInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    licensePlate?: NullableStringFieldUpdateOperationsInput | string | null
    operatingRadius?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsToCollect?: ScrapItemUpdateManyWithoutCollectorNestedInput
  }

  export type ProfileUncheckedUpdateWithoutItemsToSellInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    licensePlate?: NullableStringFieldUpdateOperationsInput | string | null
    operatingRadius?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsToCollect?: ScrapItemUncheckedUpdateManyWithoutCollectorNestedInput
  }

  export type ProfileUpsertWithoutItemsToCollectInput = {
    update: XOR<ProfileUpdateWithoutItemsToCollectInput, ProfileUncheckedUpdateWithoutItemsToCollectInput>
    create: XOR<ProfileCreateWithoutItemsToCollectInput, ProfileUncheckedCreateWithoutItemsToCollectInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutItemsToCollectInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutItemsToCollectInput, ProfileUncheckedUpdateWithoutItemsToCollectInput>
  }

  export type ProfileUpdateWithoutItemsToCollectInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    licensePlate?: NullableStringFieldUpdateOperationsInput | string | null
    operatingRadius?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsToSell?: ScrapItemUpdateManyWithoutSellerNestedInput
  }

  export type ProfileUncheckedUpdateWithoutItemsToCollectInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    licensePlate?: NullableStringFieldUpdateOperationsInput | string | null
    operatingRadius?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsToSell?: ScrapItemUncheckedUpdateManyWithoutSellerNestedInput
  }

  export type ScrapItemCreateManySellerInput = {
    id?: string
    title: string
    description?: string | null
    wasteType: $Enums.WasteType
    estimatedWeight: number
    imageUrl: string
    latitude: number
    longitude: number
    address: string
    status?: $Enums.ItemStatus
    pickupTime?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    collectorId?: string | null
  }

  export type ScrapItemCreateManyCollectorInput = {
    id?: string
    title: string
    description?: string | null
    wasteType: $Enums.WasteType
    estimatedWeight: number
    imageUrl: string
    latitude: number
    longitude: number
    address: string
    status?: $Enums.ItemStatus
    pickupTime?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sellerId: string
  }

  export type ScrapItemUpdateWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    wasteType?: EnumWasteTypeFieldUpdateOperationsInput | $Enums.WasteType
    estimatedWeight?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collector?: ProfileUpdateOneWithoutItemsToCollectNestedInput
  }

  export type ScrapItemUncheckedUpdateWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    wasteType?: EnumWasteTypeFieldUpdateOperationsInput | $Enums.WasteType
    estimatedWeight?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collectorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScrapItemUncheckedUpdateManyWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    wasteType?: EnumWasteTypeFieldUpdateOperationsInput | $Enums.WasteType
    estimatedWeight?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collectorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScrapItemUpdateWithoutCollectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    wasteType?: EnumWasteTypeFieldUpdateOperationsInput | $Enums.WasteType
    estimatedWeight?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: ProfileUpdateOneRequiredWithoutItemsToSellNestedInput
  }

  export type ScrapItemUncheckedUpdateWithoutCollectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    wasteType?: EnumWasteTypeFieldUpdateOperationsInput | $Enums.WasteType
    estimatedWeight?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sellerId?: StringFieldUpdateOperationsInput | string
  }

  export type ScrapItemUncheckedUpdateManyWithoutCollectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    wasteType?: EnumWasteTypeFieldUpdateOperationsInput | $Enums.WasteType
    estimatedWeight?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sellerId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}