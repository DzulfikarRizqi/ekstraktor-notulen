
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model Sentence
 * 
 */
export type Sentence = $Result.DefaultSelection<Prisma.$SentencePayload>
/**
 * Model UserStory
 * 
 */
export type UserStory = $Result.DefaultSelection<Prisma.$UserStoryPayload>
/**
 * Model StorySentence
 * 
 */
export type StorySentence = $Result.DefaultSelection<Prisma.$StorySentencePayload>
/**
 * Model EvaluationRun
 * 
 */
export type EvaluationRun = $Result.DefaultSelection<Prisma.$EvaluationRunPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Documents
 * const documents = await prisma.document.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Documents
   * const documents = await prisma.document.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sentence`: Exposes CRUD operations for the **Sentence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sentences
    * const sentences = await prisma.sentence.findMany()
    * ```
    */
  get sentence(): Prisma.SentenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userStory`: Exposes CRUD operations for the **UserStory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserStories
    * const userStories = await prisma.userStory.findMany()
    * ```
    */
  get userStory(): Prisma.UserStoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.storySentence`: Exposes CRUD operations for the **StorySentence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StorySentences
    * const storySentences = await prisma.storySentence.findMany()
    * ```
    */
  get storySentence(): Prisma.StorySentenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evaluationRun`: Exposes CRUD operations for the **EvaluationRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EvaluationRuns
    * const evaluationRuns = await prisma.evaluationRun.findMany()
    * ```
    */
  get evaluationRun(): Prisma.EvaluationRunDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

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
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Document: 'Document',
    Sentence: 'Sentence',
    UserStory: 'UserStory',
    StorySentence: 'StorySentence',
    EvaluationRun: 'EvaluationRun'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "document" | "sentence" | "userStory" | "storySentence" | "evaluationRun"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      Sentence: {
        payload: Prisma.$SentencePayload<ExtArgs>
        fields: Prisma.SentenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SentenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SentenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          findFirst: {
            args: Prisma.SentenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SentenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          findMany: {
            args: Prisma.SentenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>[]
          }
          create: {
            args: Prisma.SentenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          createMany: {
            args: Prisma.SentenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SentenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>[]
          }
          delete: {
            args: Prisma.SentenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          update: {
            args: Prisma.SentenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          deleteMany: {
            args: Prisma.SentenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SentenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SentenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>[]
          }
          upsert: {
            args: Prisma.SentenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          aggregate: {
            args: Prisma.SentenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSentence>
          }
          groupBy: {
            args: Prisma.SentenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SentenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SentenceCountArgs<ExtArgs>
            result: $Utils.Optional<SentenceCountAggregateOutputType> | number
          }
        }
      }
      UserStory: {
        payload: Prisma.$UserStoryPayload<ExtArgs>
        fields: Prisma.UserStoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserStoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserStoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload>
          }
          findFirst: {
            args: Prisma.UserStoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserStoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload>
          }
          findMany: {
            args: Prisma.UserStoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload>[]
          }
          create: {
            args: Prisma.UserStoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload>
          }
          createMany: {
            args: Prisma.UserStoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserStoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload>[]
          }
          delete: {
            args: Prisma.UserStoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload>
          }
          update: {
            args: Prisma.UserStoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload>
          }
          deleteMany: {
            args: Prisma.UserStoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserStoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserStoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload>[]
          }
          upsert: {
            args: Prisma.UserStoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStoryPayload>
          }
          aggregate: {
            args: Prisma.UserStoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserStory>
          }
          groupBy: {
            args: Prisma.UserStoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserStoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserStoryCountArgs<ExtArgs>
            result: $Utils.Optional<UserStoryCountAggregateOutputType> | number
          }
        }
      }
      StorySentence: {
        payload: Prisma.$StorySentencePayload<ExtArgs>
        fields: Prisma.StorySentenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StorySentenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StorySentenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload>
          }
          findFirst: {
            args: Prisma.StorySentenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StorySentenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload>
          }
          findMany: {
            args: Prisma.StorySentenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload>[]
          }
          create: {
            args: Prisma.StorySentenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload>
          }
          createMany: {
            args: Prisma.StorySentenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StorySentenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload>[]
          }
          delete: {
            args: Prisma.StorySentenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload>
          }
          update: {
            args: Prisma.StorySentenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload>
          }
          deleteMany: {
            args: Prisma.StorySentenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StorySentenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StorySentenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload>[]
          }
          upsert: {
            args: Prisma.StorySentenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorySentencePayload>
          }
          aggregate: {
            args: Prisma.StorySentenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStorySentence>
          }
          groupBy: {
            args: Prisma.StorySentenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<StorySentenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.StorySentenceCountArgs<ExtArgs>
            result: $Utils.Optional<StorySentenceCountAggregateOutputType> | number
          }
        }
      }
      EvaluationRun: {
        payload: Prisma.$EvaluationRunPayload<ExtArgs>
        fields: Prisma.EvaluationRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvaluationRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvaluationRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload>
          }
          findFirst: {
            args: Prisma.EvaluationRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvaluationRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload>
          }
          findMany: {
            args: Prisma.EvaluationRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload>[]
          }
          create: {
            args: Prisma.EvaluationRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload>
          }
          createMany: {
            args: Prisma.EvaluationRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EvaluationRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload>[]
          }
          delete: {
            args: Prisma.EvaluationRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload>
          }
          update: {
            args: Prisma.EvaluationRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload>
          }
          deleteMany: {
            args: Prisma.EvaluationRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvaluationRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EvaluationRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload>[]
          }
          upsert: {
            args: Prisma.EvaluationRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationRunPayload>
          }
          aggregate: {
            args: Prisma.EvaluationRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvaluationRun>
          }
          groupBy: {
            args: Prisma.EvaluationRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvaluationRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvaluationRunCountArgs<ExtArgs>
            result: $Utils.Optional<EvaluationRunCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    document?: DocumentOmit
    sentence?: SentenceOmit
    userStory?: UserStoryOmit
    storySentence?: StorySentenceOmit
    evaluationRun?: EvaluationRunOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    sentences: number
    userStories: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentences?: boolean | DocumentCountOutputTypeCountSentencesArgs
    userStories?: boolean | DocumentCountOutputTypeCountUserStoriesArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountSentencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SentenceWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountUserStoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserStoryWhereInput
  }


  /**
   * Count Type SentenceCountOutputType
   */

  export type SentenceCountOutputType = {
    links: number
  }

  export type SentenceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    links?: boolean | SentenceCountOutputTypeCountLinksArgs
  }

  // Custom InputTypes
  /**
   * SentenceCountOutputType without action
   */
  export type SentenceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceCountOutputType
     */
    select?: SentenceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SentenceCountOutputType without action
   */
  export type SentenceCountOutputTypeCountLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorySentenceWhereInput
  }


  /**
   * Count Type UserStoryCountOutputType
   */

  export type UserStoryCountOutputType = {
    storySentences: number
  }

  export type UserStoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    storySentences?: boolean | UserStoryCountOutputTypeCountStorySentencesArgs
  }

  // Custom InputTypes
  /**
   * UserStoryCountOutputType without action
   */
  export type UserStoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStoryCountOutputType
     */
    select?: UserStoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserStoryCountOutputType without action
   */
  export type UserStoryCountOutputTypeCountStorySentencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorySentenceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    status: string | null
    truncated: boolean | null
    error: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    status: string | null
    truncated: boolean | null
    error: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    title: number
    content: number
    status: number
    truncated: number
    error: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocumentMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    status?: true
    truncated?: true
    error?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    status?: true
    truncated?: true
    error?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    status?: true
    truncated?: true
    error?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    title: string
    content: string
    status: string
    truncated: boolean
    error: string | null
    createdAt: Date
    updatedAt: Date
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    truncated?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentences?: boolean | Document$sentencesArgs<ExtArgs>
    userStories?: boolean | Document$userStoriesArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    truncated?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    truncated?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    truncated?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "status" | "truncated" | "error" | "createdAt" | "updatedAt", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentences?: boolean | Document$sentencesArgs<ExtArgs>
    userStories?: boolean | Document$userStoriesArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      sentences: Prisma.$SentencePayload<ExtArgs>[]
      userStories: Prisma.$UserStoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      status: string
      truncated: boolean
      error: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
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
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
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
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sentences<T extends Document$sentencesArgs<ExtArgs> = {}>(args?: Subset<T, Document$sentencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userStories<T extends Document$userStoriesArgs<ExtArgs> = {}>(args?: Subset<T, Document$userStoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly title: FieldRef<"Document", 'String'>
    readonly content: FieldRef<"Document", 'String'>
    readonly status: FieldRef<"Document", 'String'>
    readonly truncated: FieldRef<"Document", 'Boolean'>
    readonly error: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.sentences
   */
  export type Document$sentencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    where?: SentenceWhereInput
    orderBy?: SentenceOrderByWithRelationInput | SentenceOrderByWithRelationInput[]
    cursor?: SentenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SentenceScalarFieldEnum | SentenceScalarFieldEnum[]
  }

  /**
   * Document.userStories
   */
  export type Document$userStoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
    where?: UserStoryWhereInput
    orderBy?: UserStoryOrderByWithRelationInput | UserStoryOrderByWithRelationInput[]
    cursor?: UserStoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserStoryScalarFieldEnum | UserStoryScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model Sentence
   */

  export type AggregateSentence = {
    _count: SentenceCountAggregateOutputType | null
    _avg: SentenceAvgAggregateOutputType | null
    _sum: SentenceSumAggregateOutputType | null
    _min: SentenceMinAggregateOutputType | null
    _max: SentenceMaxAggregateOutputType | null
  }

  export type SentenceAvgAggregateOutputType = {
    index: number | null
  }

  export type SentenceSumAggregateOutputType = {
    index: number | null
  }

  export type SentenceMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    index: number | null
    text: string | null
  }

  export type SentenceMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    index: number | null
    text: string | null
  }

  export type SentenceCountAggregateOutputType = {
    id: number
    documentId: number
    index: number
    text: number
    _all: number
  }


  export type SentenceAvgAggregateInputType = {
    index?: true
  }

  export type SentenceSumAggregateInputType = {
    index?: true
  }

  export type SentenceMinAggregateInputType = {
    id?: true
    documentId?: true
    index?: true
    text?: true
  }

  export type SentenceMaxAggregateInputType = {
    id?: true
    documentId?: true
    index?: true
    text?: true
  }

  export type SentenceCountAggregateInputType = {
    id?: true
    documentId?: true
    index?: true
    text?: true
    _all?: true
  }

  export type SentenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sentence to aggregate.
     */
    where?: SentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sentences to fetch.
     */
    orderBy?: SentenceOrderByWithRelationInput | SentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sentences
    **/
    _count?: true | SentenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SentenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SentenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SentenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SentenceMaxAggregateInputType
  }

  export type GetSentenceAggregateType<T extends SentenceAggregateArgs> = {
        [P in keyof T & keyof AggregateSentence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSentence[P]>
      : GetScalarType<T[P], AggregateSentence[P]>
  }




  export type SentenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SentenceWhereInput
    orderBy?: SentenceOrderByWithAggregationInput | SentenceOrderByWithAggregationInput[]
    by: SentenceScalarFieldEnum[] | SentenceScalarFieldEnum
    having?: SentenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SentenceCountAggregateInputType | true
    _avg?: SentenceAvgAggregateInputType
    _sum?: SentenceSumAggregateInputType
    _min?: SentenceMinAggregateInputType
    _max?: SentenceMaxAggregateInputType
  }

  export type SentenceGroupByOutputType = {
    id: string
    documentId: string
    index: number
    text: string
    _count: SentenceCountAggregateOutputType | null
    _avg: SentenceAvgAggregateOutputType | null
    _sum: SentenceSumAggregateOutputType | null
    _min: SentenceMinAggregateOutputType | null
    _max: SentenceMaxAggregateOutputType | null
  }

  type GetSentenceGroupByPayload<T extends SentenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SentenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SentenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SentenceGroupByOutputType[P]>
            : GetScalarType<T[P], SentenceGroupByOutputType[P]>
        }
      >
    >


  export type SentenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    index?: boolean
    text?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    links?: boolean | Sentence$linksArgs<ExtArgs>
    _count?: boolean | SentenceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sentence"]>

  export type SentenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    index?: boolean
    text?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sentence"]>

  export type SentenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    index?: boolean
    text?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sentence"]>

  export type SentenceSelectScalar = {
    id?: boolean
    documentId?: boolean
    index?: boolean
    text?: boolean
  }

  export type SentenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "index" | "text", ExtArgs["result"]["sentence"]>
  export type SentenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    links?: boolean | Sentence$linksArgs<ExtArgs>
    _count?: boolean | SentenceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SentenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type SentenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $SentencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sentence"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
      links: Prisma.$StorySentencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      index: number
      text: string
    }, ExtArgs["result"]["sentence"]>
    composites: {}
  }

  type SentenceGetPayload<S extends boolean | null | undefined | SentenceDefaultArgs> = $Result.GetResult<Prisma.$SentencePayload, S>

  type SentenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SentenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SentenceCountAggregateInputType | true
    }

  export interface SentenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sentence'], meta: { name: 'Sentence' } }
    /**
     * Find zero or one Sentence that matches the filter.
     * @param {SentenceFindUniqueArgs} args - Arguments to find a Sentence
     * @example
     * // Get one Sentence
     * const sentence = await prisma.sentence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SentenceFindUniqueArgs>(args: SelectSubset<T, SentenceFindUniqueArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sentence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SentenceFindUniqueOrThrowArgs} args - Arguments to find a Sentence
     * @example
     * // Get one Sentence
     * const sentence = await prisma.sentence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SentenceFindUniqueOrThrowArgs>(args: SelectSubset<T, SentenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sentence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceFindFirstArgs} args - Arguments to find a Sentence
     * @example
     * // Get one Sentence
     * const sentence = await prisma.sentence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SentenceFindFirstArgs>(args?: SelectSubset<T, SentenceFindFirstArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sentence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceFindFirstOrThrowArgs} args - Arguments to find a Sentence
     * @example
     * // Get one Sentence
     * const sentence = await prisma.sentence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SentenceFindFirstOrThrowArgs>(args?: SelectSubset<T, SentenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sentences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sentences
     * const sentences = await prisma.sentence.findMany()
     * 
     * // Get first 10 Sentences
     * const sentences = await prisma.sentence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sentenceWithIdOnly = await prisma.sentence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SentenceFindManyArgs>(args?: SelectSubset<T, SentenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sentence.
     * @param {SentenceCreateArgs} args - Arguments to create a Sentence.
     * @example
     * // Create one Sentence
     * const Sentence = await prisma.sentence.create({
     *   data: {
     *     // ... data to create a Sentence
     *   }
     * })
     * 
     */
    create<T extends SentenceCreateArgs>(args: SelectSubset<T, SentenceCreateArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sentences.
     * @param {SentenceCreateManyArgs} args - Arguments to create many Sentences.
     * @example
     * // Create many Sentences
     * const sentence = await prisma.sentence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SentenceCreateManyArgs>(args?: SelectSubset<T, SentenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sentences and returns the data saved in the database.
     * @param {SentenceCreateManyAndReturnArgs} args - Arguments to create many Sentences.
     * @example
     * // Create many Sentences
     * const sentence = await prisma.sentence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sentences and only return the `id`
     * const sentenceWithIdOnly = await prisma.sentence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SentenceCreateManyAndReturnArgs>(args?: SelectSubset<T, SentenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sentence.
     * @param {SentenceDeleteArgs} args - Arguments to delete one Sentence.
     * @example
     * // Delete one Sentence
     * const Sentence = await prisma.sentence.delete({
     *   where: {
     *     // ... filter to delete one Sentence
     *   }
     * })
     * 
     */
    delete<T extends SentenceDeleteArgs>(args: SelectSubset<T, SentenceDeleteArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sentence.
     * @param {SentenceUpdateArgs} args - Arguments to update one Sentence.
     * @example
     * // Update one Sentence
     * const sentence = await prisma.sentence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SentenceUpdateArgs>(args: SelectSubset<T, SentenceUpdateArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sentences.
     * @param {SentenceDeleteManyArgs} args - Arguments to filter Sentences to delete.
     * @example
     * // Delete a few Sentences
     * const { count } = await prisma.sentence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SentenceDeleteManyArgs>(args?: SelectSubset<T, SentenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sentences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sentences
     * const sentence = await prisma.sentence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SentenceUpdateManyArgs>(args: SelectSubset<T, SentenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sentences and returns the data updated in the database.
     * @param {SentenceUpdateManyAndReturnArgs} args - Arguments to update many Sentences.
     * @example
     * // Update many Sentences
     * const sentence = await prisma.sentence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sentences and only return the `id`
     * const sentenceWithIdOnly = await prisma.sentence.updateManyAndReturn({
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
    updateManyAndReturn<T extends SentenceUpdateManyAndReturnArgs>(args: SelectSubset<T, SentenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sentence.
     * @param {SentenceUpsertArgs} args - Arguments to update or create a Sentence.
     * @example
     * // Update or create a Sentence
     * const sentence = await prisma.sentence.upsert({
     *   create: {
     *     // ... data to create a Sentence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sentence we want to update
     *   }
     * })
     */
    upsert<T extends SentenceUpsertArgs>(args: SelectSubset<T, SentenceUpsertArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sentences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceCountArgs} args - Arguments to filter Sentences to count.
     * @example
     * // Count the number of Sentences
     * const count = await prisma.sentence.count({
     *   where: {
     *     // ... the filter for the Sentences we want to count
     *   }
     * })
    **/
    count<T extends SentenceCountArgs>(
      args?: Subset<T, SentenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SentenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sentence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SentenceAggregateArgs>(args: Subset<T, SentenceAggregateArgs>): Prisma.PrismaPromise<GetSentenceAggregateType<T>>

    /**
     * Group by Sentence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceGroupByArgs} args - Group by arguments.
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
      T extends SentenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SentenceGroupByArgs['orderBy'] }
        : { orderBy?: SentenceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SentenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSentenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sentence model
   */
  readonly fields: SentenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sentence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SentenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    links<T extends Sentence$linksArgs<ExtArgs> = {}>(args?: Subset<T, Sentence$linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Sentence model
   */
  interface SentenceFieldRefs {
    readonly id: FieldRef<"Sentence", 'String'>
    readonly documentId: FieldRef<"Sentence", 'String'>
    readonly index: FieldRef<"Sentence", 'Int'>
    readonly text: FieldRef<"Sentence", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Sentence findUnique
   */
  export type SentenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter, which Sentence to fetch.
     */
    where: SentenceWhereUniqueInput
  }

  /**
   * Sentence findUniqueOrThrow
   */
  export type SentenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter, which Sentence to fetch.
     */
    where: SentenceWhereUniqueInput
  }

  /**
   * Sentence findFirst
   */
  export type SentenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter, which Sentence to fetch.
     */
    where?: SentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sentences to fetch.
     */
    orderBy?: SentenceOrderByWithRelationInput | SentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sentences.
     */
    cursor?: SentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sentences.
     */
    distinct?: SentenceScalarFieldEnum | SentenceScalarFieldEnum[]
  }

  /**
   * Sentence findFirstOrThrow
   */
  export type SentenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter, which Sentence to fetch.
     */
    where?: SentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sentences to fetch.
     */
    orderBy?: SentenceOrderByWithRelationInput | SentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sentences.
     */
    cursor?: SentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sentences.
     */
    distinct?: SentenceScalarFieldEnum | SentenceScalarFieldEnum[]
  }

  /**
   * Sentence findMany
   */
  export type SentenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter, which Sentences to fetch.
     */
    where?: SentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sentences to fetch.
     */
    orderBy?: SentenceOrderByWithRelationInput | SentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sentences.
     */
    cursor?: SentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sentences.
     */
    distinct?: SentenceScalarFieldEnum | SentenceScalarFieldEnum[]
  }

  /**
   * Sentence create
   */
  export type SentenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * The data needed to create a Sentence.
     */
    data: XOR<SentenceCreateInput, SentenceUncheckedCreateInput>
  }

  /**
   * Sentence createMany
   */
  export type SentenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sentences.
     */
    data: SentenceCreateManyInput | SentenceCreateManyInput[]
  }

  /**
   * Sentence createManyAndReturn
   */
  export type SentenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * The data used to create many Sentences.
     */
    data: SentenceCreateManyInput | SentenceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sentence update
   */
  export type SentenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * The data needed to update a Sentence.
     */
    data: XOR<SentenceUpdateInput, SentenceUncheckedUpdateInput>
    /**
     * Choose, which Sentence to update.
     */
    where: SentenceWhereUniqueInput
  }

  /**
   * Sentence updateMany
   */
  export type SentenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sentences.
     */
    data: XOR<SentenceUpdateManyMutationInput, SentenceUncheckedUpdateManyInput>
    /**
     * Filter which Sentences to update
     */
    where?: SentenceWhereInput
    /**
     * Limit how many Sentences to update.
     */
    limit?: number
  }

  /**
   * Sentence updateManyAndReturn
   */
  export type SentenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * The data used to update Sentences.
     */
    data: XOR<SentenceUpdateManyMutationInput, SentenceUncheckedUpdateManyInput>
    /**
     * Filter which Sentences to update
     */
    where?: SentenceWhereInput
    /**
     * Limit how many Sentences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sentence upsert
   */
  export type SentenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * The filter to search for the Sentence to update in case it exists.
     */
    where: SentenceWhereUniqueInput
    /**
     * In case the Sentence found by the `where` argument doesn't exist, create a new Sentence with this data.
     */
    create: XOR<SentenceCreateInput, SentenceUncheckedCreateInput>
    /**
     * In case the Sentence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SentenceUpdateInput, SentenceUncheckedUpdateInput>
  }

  /**
   * Sentence delete
   */
  export type SentenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter which Sentence to delete.
     */
    where: SentenceWhereUniqueInput
  }

  /**
   * Sentence deleteMany
   */
  export type SentenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sentences to delete
     */
    where?: SentenceWhereInput
    /**
     * Limit how many Sentences to delete.
     */
    limit?: number
  }

  /**
   * Sentence.links
   */
  export type Sentence$linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    where?: StorySentenceWhereInput
    orderBy?: StorySentenceOrderByWithRelationInput | StorySentenceOrderByWithRelationInput[]
    cursor?: StorySentenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StorySentenceScalarFieldEnum | StorySentenceScalarFieldEnum[]
  }

  /**
   * Sentence without action
   */
  export type SentenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
  }


  /**
   * Model UserStory
   */

  export type AggregateUserStory = {
    _count: UserStoryCountAggregateOutputType | null
    _min: UserStoryMinAggregateOutputType | null
    _max: UserStoryMaxAggregateOutputType | null
  }

  export type UserStoryMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    storyCode: string | null
    actor: string | null
    action: string | null
    benefit: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserStoryMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    storyCode: string | null
    actor: string | null
    action: string | null
    benefit: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserStoryCountAggregateOutputType = {
    id: number
    documentId: number
    storyCode: number
    actor: number
    action: number
    benefit: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserStoryMinAggregateInputType = {
    id?: true
    documentId?: true
    storyCode?: true
    actor?: true
    action?: true
    benefit?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserStoryMaxAggregateInputType = {
    id?: true
    documentId?: true
    storyCode?: true
    actor?: true
    action?: true
    benefit?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserStoryCountAggregateInputType = {
    id?: true
    documentId?: true
    storyCode?: true
    actor?: true
    action?: true
    benefit?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserStoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStory to aggregate.
     */
    where?: UserStoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStories to fetch.
     */
    orderBy?: UserStoryOrderByWithRelationInput | UserStoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserStoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserStories
    **/
    _count?: true | UserStoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserStoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserStoryMaxAggregateInputType
  }

  export type GetUserStoryAggregateType<T extends UserStoryAggregateArgs> = {
        [P in keyof T & keyof AggregateUserStory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserStory[P]>
      : GetScalarType<T[P], AggregateUserStory[P]>
  }




  export type UserStoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserStoryWhereInput
    orderBy?: UserStoryOrderByWithAggregationInput | UserStoryOrderByWithAggregationInput[]
    by: UserStoryScalarFieldEnum[] | UserStoryScalarFieldEnum
    having?: UserStoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserStoryCountAggregateInputType | true
    _min?: UserStoryMinAggregateInputType
    _max?: UserStoryMaxAggregateInputType
  }

  export type UserStoryGroupByOutputType = {
    id: string
    documentId: string
    storyCode: string
    actor: string
    action: string
    benefit: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: UserStoryCountAggregateOutputType | null
    _min: UserStoryMinAggregateOutputType | null
    _max: UserStoryMaxAggregateOutputType | null
  }

  type GetUserStoryGroupByPayload<T extends UserStoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserStoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserStoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserStoryGroupByOutputType[P]>
            : GetScalarType<T[P], UserStoryGroupByOutputType[P]>
        }
      >
    >


  export type UserStorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    storyCode?: boolean
    actor?: boolean
    action?: boolean
    benefit?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    storySentences?: boolean | UserStory$storySentencesArgs<ExtArgs>
    _count?: boolean | UserStoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStory"]>

  export type UserStorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    storyCode?: boolean
    actor?: boolean
    action?: boolean
    benefit?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStory"]>

  export type UserStorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    storyCode?: boolean
    actor?: boolean
    action?: boolean
    benefit?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStory"]>

  export type UserStorySelectScalar = {
    id?: boolean
    documentId?: boolean
    storyCode?: boolean
    actor?: boolean
    action?: boolean
    benefit?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserStoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "storyCode" | "actor" | "action" | "benefit" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["userStory"]>
  export type UserStoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    storySentences?: boolean | UserStory$storySentencesArgs<ExtArgs>
    _count?: boolean | UserStoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserStoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type UserStoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $UserStoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserStory"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
      storySentences: Prisma.$StorySentencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      storyCode: string
      actor: string
      action: string
      benefit: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userStory"]>
    composites: {}
  }

  type UserStoryGetPayload<S extends boolean | null | undefined | UserStoryDefaultArgs> = $Result.GetResult<Prisma.$UserStoryPayload, S>

  type UserStoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserStoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserStoryCountAggregateInputType | true
    }

  export interface UserStoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserStory'], meta: { name: 'UserStory' } }
    /**
     * Find zero or one UserStory that matches the filter.
     * @param {UserStoryFindUniqueArgs} args - Arguments to find a UserStory
     * @example
     * // Get one UserStory
     * const userStory = await prisma.userStory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserStoryFindUniqueArgs>(args: SelectSubset<T, UserStoryFindUniqueArgs<ExtArgs>>): Prisma__UserStoryClient<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserStory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserStoryFindUniqueOrThrowArgs} args - Arguments to find a UserStory
     * @example
     * // Get one UserStory
     * const userStory = await prisma.userStory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserStoryFindUniqueOrThrowArgs>(args: SelectSubset<T, UserStoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserStoryClient<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserStory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStoryFindFirstArgs} args - Arguments to find a UserStory
     * @example
     * // Get one UserStory
     * const userStory = await prisma.userStory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserStoryFindFirstArgs>(args?: SelectSubset<T, UserStoryFindFirstArgs<ExtArgs>>): Prisma__UserStoryClient<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserStory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStoryFindFirstOrThrowArgs} args - Arguments to find a UserStory
     * @example
     * // Get one UserStory
     * const userStory = await prisma.userStory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserStoryFindFirstOrThrowArgs>(args?: SelectSubset<T, UserStoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserStoryClient<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserStories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserStories
     * const userStories = await prisma.userStory.findMany()
     * 
     * // Get first 10 UserStories
     * const userStories = await prisma.userStory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userStoryWithIdOnly = await prisma.userStory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserStoryFindManyArgs>(args?: SelectSubset<T, UserStoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserStory.
     * @param {UserStoryCreateArgs} args - Arguments to create a UserStory.
     * @example
     * // Create one UserStory
     * const UserStory = await prisma.userStory.create({
     *   data: {
     *     // ... data to create a UserStory
     *   }
     * })
     * 
     */
    create<T extends UserStoryCreateArgs>(args: SelectSubset<T, UserStoryCreateArgs<ExtArgs>>): Prisma__UserStoryClient<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserStories.
     * @param {UserStoryCreateManyArgs} args - Arguments to create many UserStories.
     * @example
     * // Create many UserStories
     * const userStory = await prisma.userStory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserStoryCreateManyArgs>(args?: SelectSubset<T, UserStoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserStories and returns the data saved in the database.
     * @param {UserStoryCreateManyAndReturnArgs} args - Arguments to create many UserStories.
     * @example
     * // Create many UserStories
     * const userStory = await prisma.userStory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserStories and only return the `id`
     * const userStoryWithIdOnly = await prisma.userStory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserStoryCreateManyAndReturnArgs>(args?: SelectSubset<T, UserStoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserStory.
     * @param {UserStoryDeleteArgs} args - Arguments to delete one UserStory.
     * @example
     * // Delete one UserStory
     * const UserStory = await prisma.userStory.delete({
     *   where: {
     *     // ... filter to delete one UserStory
     *   }
     * })
     * 
     */
    delete<T extends UserStoryDeleteArgs>(args: SelectSubset<T, UserStoryDeleteArgs<ExtArgs>>): Prisma__UserStoryClient<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserStory.
     * @param {UserStoryUpdateArgs} args - Arguments to update one UserStory.
     * @example
     * // Update one UserStory
     * const userStory = await prisma.userStory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserStoryUpdateArgs>(args: SelectSubset<T, UserStoryUpdateArgs<ExtArgs>>): Prisma__UserStoryClient<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserStories.
     * @param {UserStoryDeleteManyArgs} args - Arguments to filter UserStories to delete.
     * @example
     * // Delete a few UserStories
     * const { count } = await prisma.userStory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserStoryDeleteManyArgs>(args?: SelectSubset<T, UserStoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserStories
     * const userStory = await prisma.userStory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserStoryUpdateManyArgs>(args: SelectSubset<T, UserStoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStories and returns the data updated in the database.
     * @param {UserStoryUpdateManyAndReturnArgs} args - Arguments to update many UserStories.
     * @example
     * // Update many UserStories
     * const userStory = await prisma.userStory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserStories and only return the `id`
     * const userStoryWithIdOnly = await prisma.userStory.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserStoryUpdateManyAndReturnArgs>(args: SelectSubset<T, UserStoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserStory.
     * @param {UserStoryUpsertArgs} args - Arguments to update or create a UserStory.
     * @example
     * // Update or create a UserStory
     * const userStory = await prisma.userStory.upsert({
     *   create: {
     *     // ... data to create a UserStory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserStory we want to update
     *   }
     * })
     */
    upsert<T extends UserStoryUpsertArgs>(args: SelectSubset<T, UserStoryUpsertArgs<ExtArgs>>): Prisma__UserStoryClient<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserStories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStoryCountArgs} args - Arguments to filter UserStories to count.
     * @example
     * // Count the number of UserStories
     * const count = await prisma.userStory.count({
     *   where: {
     *     // ... the filter for the UserStories we want to count
     *   }
     * })
    **/
    count<T extends UserStoryCountArgs>(
      args?: Subset<T, UserStoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserStoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserStory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserStoryAggregateArgs>(args: Subset<T, UserStoryAggregateArgs>): Prisma.PrismaPromise<GetUserStoryAggregateType<T>>

    /**
     * Group by UserStory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStoryGroupByArgs} args - Group by arguments.
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
      T extends UserStoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserStoryGroupByArgs['orderBy'] }
        : { orderBy?: UserStoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserStoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserStoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserStory model
   */
  readonly fields: UserStoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserStory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserStoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    storySentences<T extends UserStory$storySentencesArgs<ExtArgs> = {}>(args?: Subset<T, UserStory$storySentencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the UserStory model
   */
  interface UserStoryFieldRefs {
    readonly id: FieldRef<"UserStory", 'String'>
    readonly documentId: FieldRef<"UserStory", 'String'>
    readonly storyCode: FieldRef<"UserStory", 'String'>
    readonly actor: FieldRef<"UserStory", 'String'>
    readonly action: FieldRef<"UserStory", 'String'>
    readonly benefit: FieldRef<"UserStory", 'String'>
    readonly status: FieldRef<"UserStory", 'String'>
    readonly createdAt: FieldRef<"UserStory", 'DateTime'>
    readonly updatedAt: FieldRef<"UserStory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserStory findUnique
   */
  export type UserStoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
    /**
     * Filter, which UserStory to fetch.
     */
    where: UserStoryWhereUniqueInput
  }

  /**
   * UserStory findUniqueOrThrow
   */
  export type UserStoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
    /**
     * Filter, which UserStory to fetch.
     */
    where: UserStoryWhereUniqueInput
  }

  /**
   * UserStory findFirst
   */
  export type UserStoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
    /**
     * Filter, which UserStory to fetch.
     */
    where?: UserStoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStories to fetch.
     */
    orderBy?: UserStoryOrderByWithRelationInput | UserStoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStories.
     */
    cursor?: UserStoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStories.
     */
    distinct?: UserStoryScalarFieldEnum | UserStoryScalarFieldEnum[]
  }

  /**
   * UserStory findFirstOrThrow
   */
  export type UserStoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
    /**
     * Filter, which UserStory to fetch.
     */
    where?: UserStoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStories to fetch.
     */
    orderBy?: UserStoryOrderByWithRelationInput | UserStoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStories.
     */
    cursor?: UserStoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStories.
     */
    distinct?: UserStoryScalarFieldEnum | UserStoryScalarFieldEnum[]
  }

  /**
   * UserStory findMany
   */
  export type UserStoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
    /**
     * Filter, which UserStories to fetch.
     */
    where?: UserStoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStories to fetch.
     */
    orderBy?: UserStoryOrderByWithRelationInput | UserStoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserStories.
     */
    cursor?: UserStoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStories.
     */
    distinct?: UserStoryScalarFieldEnum | UserStoryScalarFieldEnum[]
  }

  /**
   * UserStory create
   */
  export type UserStoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
    /**
     * The data needed to create a UserStory.
     */
    data: XOR<UserStoryCreateInput, UserStoryUncheckedCreateInput>
  }

  /**
   * UserStory createMany
   */
  export type UserStoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserStories.
     */
    data: UserStoryCreateManyInput | UserStoryCreateManyInput[]
  }

  /**
   * UserStory createManyAndReturn
   */
  export type UserStoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * The data used to create many UserStories.
     */
    data: UserStoryCreateManyInput | UserStoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStory update
   */
  export type UserStoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
    /**
     * The data needed to update a UserStory.
     */
    data: XOR<UserStoryUpdateInput, UserStoryUncheckedUpdateInput>
    /**
     * Choose, which UserStory to update.
     */
    where: UserStoryWhereUniqueInput
  }

  /**
   * UserStory updateMany
   */
  export type UserStoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserStories.
     */
    data: XOR<UserStoryUpdateManyMutationInput, UserStoryUncheckedUpdateManyInput>
    /**
     * Filter which UserStories to update
     */
    where?: UserStoryWhereInput
    /**
     * Limit how many UserStories to update.
     */
    limit?: number
  }

  /**
   * UserStory updateManyAndReturn
   */
  export type UserStoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * The data used to update UserStories.
     */
    data: XOR<UserStoryUpdateManyMutationInput, UserStoryUncheckedUpdateManyInput>
    /**
     * Filter which UserStories to update
     */
    where?: UserStoryWhereInput
    /**
     * Limit how many UserStories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStory upsert
   */
  export type UserStoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
    /**
     * The filter to search for the UserStory to update in case it exists.
     */
    where: UserStoryWhereUniqueInput
    /**
     * In case the UserStory found by the `where` argument doesn't exist, create a new UserStory with this data.
     */
    create: XOR<UserStoryCreateInput, UserStoryUncheckedCreateInput>
    /**
     * In case the UserStory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserStoryUpdateInput, UserStoryUncheckedUpdateInput>
  }

  /**
   * UserStory delete
   */
  export type UserStoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
    /**
     * Filter which UserStory to delete.
     */
    where: UserStoryWhereUniqueInput
  }

  /**
   * UserStory deleteMany
   */
  export type UserStoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStories to delete
     */
    where?: UserStoryWhereInput
    /**
     * Limit how many UserStories to delete.
     */
    limit?: number
  }

  /**
   * UserStory.storySentences
   */
  export type UserStory$storySentencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    where?: StorySentenceWhereInput
    orderBy?: StorySentenceOrderByWithRelationInput | StorySentenceOrderByWithRelationInput[]
    cursor?: StorySentenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StorySentenceScalarFieldEnum | StorySentenceScalarFieldEnum[]
  }

  /**
   * UserStory without action
   */
  export type UserStoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStory
     */
    select?: UserStorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStory
     */
    omit?: UserStoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStoryInclude<ExtArgs> | null
  }


  /**
   * Model StorySentence
   */

  export type AggregateStorySentence = {
    _count: StorySentenceCountAggregateOutputType | null
    _avg: StorySentenceAvgAggregateOutputType | null
    _sum: StorySentenceSumAggregateOutputType | null
    _min: StorySentenceMinAggregateOutputType | null
    _max: StorySentenceMaxAggregateOutputType | null
  }

  export type StorySentenceAvgAggregateOutputType = {
    confidenceScore: number | null
    embeddingSimilarity: number | null
  }

  export type StorySentenceSumAggregateOutputType = {
    confidenceScore: number | null
    embeddingSimilarity: number | null
  }

  export type StorySentenceMinAggregateOutputType = {
    id: string | null
    storyId: string | null
    sentenceId: string | null
    llmVerdict: boolean | null
    confidenceScore: number | null
    llmReason: string | null
    embeddingSimilarity: number | null
    verificationStatus: string | null
  }

  export type StorySentenceMaxAggregateOutputType = {
    id: string | null
    storyId: string | null
    sentenceId: string | null
    llmVerdict: boolean | null
    confidenceScore: number | null
    llmReason: string | null
    embeddingSimilarity: number | null
    verificationStatus: string | null
  }

  export type StorySentenceCountAggregateOutputType = {
    id: number
    storyId: number
    sentenceId: number
    llmVerdict: number
    confidenceScore: number
    llmReason: number
    embeddingSimilarity: number
    verificationStatus: number
    _all: number
  }


  export type StorySentenceAvgAggregateInputType = {
    confidenceScore?: true
    embeddingSimilarity?: true
  }

  export type StorySentenceSumAggregateInputType = {
    confidenceScore?: true
    embeddingSimilarity?: true
  }

  export type StorySentenceMinAggregateInputType = {
    id?: true
    storyId?: true
    sentenceId?: true
    llmVerdict?: true
    confidenceScore?: true
    llmReason?: true
    embeddingSimilarity?: true
    verificationStatus?: true
  }

  export type StorySentenceMaxAggregateInputType = {
    id?: true
    storyId?: true
    sentenceId?: true
    llmVerdict?: true
    confidenceScore?: true
    llmReason?: true
    embeddingSimilarity?: true
    verificationStatus?: true
  }

  export type StorySentenceCountAggregateInputType = {
    id?: true
    storyId?: true
    sentenceId?: true
    llmVerdict?: true
    confidenceScore?: true
    llmReason?: true
    embeddingSimilarity?: true
    verificationStatus?: true
    _all?: true
  }

  export type StorySentenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorySentence to aggregate.
     */
    where?: StorySentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorySentences to fetch.
     */
    orderBy?: StorySentenceOrderByWithRelationInput | StorySentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StorySentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorySentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorySentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StorySentences
    **/
    _count?: true | StorySentenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StorySentenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StorySentenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StorySentenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StorySentenceMaxAggregateInputType
  }

  export type GetStorySentenceAggregateType<T extends StorySentenceAggregateArgs> = {
        [P in keyof T & keyof AggregateStorySentence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStorySentence[P]>
      : GetScalarType<T[P], AggregateStorySentence[P]>
  }




  export type StorySentenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorySentenceWhereInput
    orderBy?: StorySentenceOrderByWithAggregationInput | StorySentenceOrderByWithAggregationInput[]
    by: StorySentenceScalarFieldEnum[] | StorySentenceScalarFieldEnum
    having?: StorySentenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StorySentenceCountAggregateInputType | true
    _avg?: StorySentenceAvgAggregateInputType
    _sum?: StorySentenceSumAggregateInputType
    _min?: StorySentenceMinAggregateInputType
    _max?: StorySentenceMaxAggregateInputType
  }

  export type StorySentenceGroupByOutputType = {
    id: string
    storyId: string
    sentenceId: string
    llmVerdict: boolean
    confidenceScore: number | null
    llmReason: string | null
    embeddingSimilarity: number | null
    verificationStatus: string
    _count: StorySentenceCountAggregateOutputType | null
    _avg: StorySentenceAvgAggregateOutputType | null
    _sum: StorySentenceSumAggregateOutputType | null
    _min: StorySentenceMinAggregateOutputType | null
    _max: StorySentenceMaxAggregateOutputType | null
  }

  type GetStorySentenceGroupByPayload<T extends StorySentenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StorySentenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StorySentenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StorySentenceGroupByOutputType[P]>
            : GetScalarType<T[P], StorySentenceGroupByOutputType[P]>
        }
      >
    >


  export type StorySentenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storyId?: boolean
    sentenceId?: boolean
    llmVerdict?: boolean
    confidenceScore?: boolean
    llmReason?: boolean
    embeddingSimilarity?: boolean
    verificationStatus?: boolean
    story?: boolean | UserStoryDefaultArgs<ExtArgs>
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storySentence"]>

  export type StorySentenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storyId?: boolean
    sentenceId?: boolean
    llmVerdict?: boolean
    confidenceScore?: boolean
    llmReason?: boolean
    embeddingSimilarity?: boolean
    verificationStatus?: boolean
    story?: boolean | UserStoryDefaultArgs<ExtArgs>
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storySentence"]>

  export type StorySentenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storyId?: boolean
    sentenceId?: boolean
    llmVerdict?: boolean
    confidenceScore?: boolean
    llmReason?: boolean
    embeddingSimilarity?: boolean
    verificationStatus?: boolean
    story?: boolean | UserStoryDefaultArgs<ExtArgs>
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storySentence"]>

  export type StorySentenceSelectScalar = {
    id?: boolean
    storyId?: boolean
    sentenceId?: boolean
    llmVerdict?: boolean
    confidenceScore?: boolean
    llmReason?: boolean
    embeddingSimilarity?: boolean
    verificationStatus?: boolean
  }

  export type StorySentenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "storyId" | "sentenceId" | "llmVerdict" | "confidenceScore" | "llmReason" | "embeddingSimilarity" | "verificationStatus", ExtArgs["result"]["storySentence"]>
  export type StorySentenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    story?: boolean | UserStoryDefaultArgs<ExtArgs>
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
  }
  export type StorySentenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    story?: boolean | UserStoryDefaultArgs<ExtArgs>
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
  }
  export type StorySentenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    story?: boolean | UserStoryDefaultArgs<ExtArgs>
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
  }

  export type $StorySentencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StorySentence"
    objects: {
      story: Prisma.$UserStoryPayload<ExtArgs>
      sentence: Prisma.$SentencePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      storyId: string
      sentenceId: string
      llmVerdict: boolean
      confidenceScore: number | null
      llmReason: string | null
      embeddingSimilarity: number | null
      verificationStatus: string
    }, ExtArgs["result"]["storySentence"]>
    composites: {}
  }

  type StorySentenceGetPayload<S extends boolean | null | undefined | StorySentenceDefaultArgs> = $Result.GetResult<Prisma.$StorySentencePayload, S>

  type StorySentenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StorySentenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StorySentenceCountAggregateInputType | true
    }

  export interface StorySentenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StorySentence'], meta: { name: 'StorySentence' } }
    /**
     * Find zero or one StorySentence that matches the filter.
     * @param {StorySentenceFindUniqueArgs} args - Arguments to find a StorySentence
     * @example
     * // Get one StorySentence
     * const storySentence = await prisma.storySentence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StorySentenceFindUniqueArgs>(args: SelectSubset<T, StorySentenceFindUniqueArgs<ExtArgs>>): Prisma__StorySentenceClient<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StorySentence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StorySentenceFindUniqueOrThrowArgs} args - Arguments to find a StorySentence
     * @example
     * // Get one StorySentence
     * const storySentence = await prisma.storySentence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StorySentenceFindUniqueOrThrowArgs>(args: SelectSubset<T, StorySentenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StorySentenceClient<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorySentence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorySentenceFindFirstArgs} args - Arguments to find a StorySentence
     * @example
     * // Get one StorySentence
     * const storySentence = await prisma.storySentence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StorySentenceFindFirstArgs>(args?: SelectSubset<T, StorySentenceFindFirstArgs<ExtArgs>>): Prisma__StorySentenceClient<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorySentence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorySentenceFindFirstOrThrowArgs} args - Arguments to find a StorySentence
     * @example
     * // Get one StorySentence
     * const storySentence = await prisma.storySentence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StorySentenceFindFirstOrThrowArgs>(args?: SelectSubset<T, StorySentenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__StorySentenceClient<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StorySentences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorySentenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StorySentences
     * const storySentences = await prisma.storySentence.findMany()
     * 
     * // Get first 10 StorySentences
     * const storySentences = await prisma.storySentence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storySentenceWithIdOnly = await prisma.storySentence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StorySentenceFindManyArgs>(args?: SelectSubset<T, StorySentenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StorySentence.
     * @param {StorySentenceCreateArgs} args - Arguments to create a StorySentence.
     * @example
     * // Create one StorySentence
     * const StorySentence = await prisma.storySentence.create({
     *   data: {
     *     // ... data to create a StorySentence
     *   }
     * })
     * 
     */
    create<T extends StorySentenceCreateArgs>(args: SelectSubset<T, StorySentenceCreateArgs<ExtArgs>>): Prisma__StorySentenceClient<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StorySentences.
     * @param {StorySentenceCreateManyArgs} args - Arguments to create many StorySentences.
     * @example
     * // Create many StorySentences
     * const storySentence = await prisma.storySentence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StorySentenceCreateManyArgs>(args?: SelectSubset<T, StorySentenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StorySentences and returns the data saved in the database.
     * @param {StorySentenceCreateManyAndReturnArgs} args - Arguments to create many StorySentences.
     * @example
     * // Create many StorySentences
     * const storySentence = await prisma.storySentence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StorySentences and only return the `id`
     * const storySentenceWithIdOnly = await prisma.storySentence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StorySentenceCreateManyAndReturnArgs>(args?: SelectSubset<T, StorySentenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StorySentence.
     * @param {StorySentenceDeleteArgs} args - Arguments to delete one StorySentence.
     * @example
     * // Delete one StorySentence
     * const StorySentence = await prisma.storySentence.delete({
     *   where: {
     *     // ... filter to delete one StorySentence
     *   }
     * })
     * 
     */
    delete<T extends StorySentenceDeleteArgs>(args: SelectSubset<T, StorySentenceDeleteArgs<ExtArgs>>): Prisma__StorySentenceClient<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StorySentence.
     * @param {StorySentenceUpdateArgs} args - Arguments to update one StorySentence.
     * @example
     * // Update one StorySentence
     * const storySentence = await prisma.storySentence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StorySentenceUpdateArgs>(args: SelectSubset<T, StorySentenceUpdateArgs<ExtArgs>>): Prisma__StorySentenceClient<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StorySentences.
     * @param {StorySentenceDeleteManyArgs} args - Arguments to filter StorySentences to delete.
     * @example
     * // Delete a few StorySentences
     * const { count } = await prisma.storySentence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StorySentenceDeleteManyArgs>(args?: SelectSubset<T, StorySentenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorySentences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorySentenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StorySentences
     * const storySentence = await prisma.storySentence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StorySentenceUpdateManyArgs>(args: SelectSubset<T, StorySentenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorySentences and returns the data updated in the database.
     * @param {StorySentenceUpdateManyAndReturnArgs} args - Arguments to update many StorySentences.
     * @example
     * // Update many StorySentences
     * const storySentence = await prisma.storySentence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StorySentences and only return the `id`
     * const storySentenceWithIdOnly = await prisma.storySentence.updateManyAndReturn({
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
    updateManyAndReturn<T extends StorySentenceUpdateManyAndReturnArgs>(args: SelectSubset<T, StorySentenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StorySentence.
     * @param {StorySentenceUpsertArgs} args - Arguments to update or create a StorySentence.
     * @example
     * // Update or create a StorySentence
     * const storySentence = await prisma.storySentence.upsert({
     *   create: {
     *     // ... data to create a StorySentence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StorySentence we want to update
     *   }
     * })
     */
    upsert<T extends StorySentenceUpsertArgs>(args: SelectSubset<T, StorySentenceUpsertArgs<ExtArgs>>): Prisma__StorySentenceClient<$Result.GetResult<Prisma.$StorySentencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StorySentences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorySentenceCountArgs} args - Arguments to filter StorySentences to count.
     * @example
     * // Count the number of StorySentences
     * const count = await prisma.storySentence.count({
     *   where: {
     *     // ... the filter for the StorySentences we want to count
     *   }
     * })
    **/
    count<T extends StorySentenceCountArgs>(
      args?: Subset<T, StorySentenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StorySentenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StorySentence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorySentenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StorySentenceAggregateArgs>(args: Subset<T, StorySentenceAggregateArgs>): Prisma.PrismaPromise<GetStorySentenceAggregateType<T>>

    /**
     * Group by StorySentence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorySentenceGroupByArgs} args - Group by arguments.
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
      T extends StorySentenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StorySentenceGroupByArgs['orderBy'] }
        : { orderBy?: StorySentenceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StorySentenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStorySentenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StorySentence model
   */
  readonly fields: StorySentenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StorySentence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StorySentenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    story<T extends UserStoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserStoryDefaultArgs<ExtArgs>>): Prisma__UserStoryClient<$Result.GetResult<Prisma.$UserStoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sentence<T extends SentenceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SentenceDefaultArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the StorySentence model
   */
  interface StorySentenceFieldRefs {
    readonly id: FieldRef<"StorySentence", 'String'>
    readonly storyId: FieldRef<"StorySentence", 'String'>
    readonly sentenceId: FieldRef<"StorySentence", 'String'>
    readonly llmVerdict: FieldRef<"StorySentence", 'Boolean'>
    readonly confidenceScore: FieldRef<"StorySentence", 'Float'>
    readonly llmReason: FieldRef<"StorySentence", 'String'>
    readonly embeddingSimilarity: FieldRef<"StorySentence", 'Float'>
    readonly verificationStatus: FieldRef<"StorySentence", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StorySentence findUnique
   */
  export type StorySentenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    /**
     * Filter, which StorySentence to fetch.
     */
    where: StorySentenceWhereUniqueInput
  }

  /**
   * StorySentence findUniqueOrThrow
   */
  export type StorySentenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    /**
     * Filter, which StorySentence to fetch.
     */
    where: StorySentenceWhereUniqueInput
  }

  /**
   * StorySentence findFirst
   */
  export type StorySentenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    /**
     * Filter, which StorySentence to fetch.
     */
    where?: StorySentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorySentences to fetch.
     */
    orderBy?: StorySentenceOrderByWithRelationInput | StorySentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorySentences.
     */
    cursor?: StorySentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorySentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorySentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorySentences.
     */
    distinct?: StorySentenceScalarFieldEnum | StorySentenceScalarFieldEnum[]
  }

  /**
   * StorySentence findFirstOrThrow
   */
  export type StorySentenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    /**
     * Filter, which StorySentence to fetch.
     */
    where?: StorySentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorySentences to fetch.
     */
    orderBy?: StorySentenceOrderByWithRelationInput | StorySentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorySentences.
     */
    cursor?: StorySentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorySentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorySentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorySentences.
     */
    distinct?: StorySentenceScalarFieldEnum | StorySentenceScalarFieldEnum[]
  }

  /**
   * StorySentence findMany
   */
  export type StorySentenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    /**
     * Filter, which StorySentences to fetch.
     */
    where?: StorySentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorySentences to fetch.
     */
    orderBy?: StorySentenceOrderByWithRelationInput | StorySentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StorySentences.
     */
    cursor?: StorySentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorySentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorySentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorySentences.
     */
    distinct?: StorySentenceScalarFieldEnum | StorySentenceScalarFieldEnum[]
  }

  /**
   * StorySentence create
   */
  export type StorySentenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    /**
     * The data needed to create a StorySentence.
     */
    data: XOR<StorySentenceCreateInput, StorySentenceUncheckedCreateInput>
  }

  /**
   * StorySentence createMany
   */
  export type StorySentenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StorySentences.
     */
    data: StorySentenceCreateManyInput | StorySentenceCreateManyInput[]
  }

  /**
   * StorySentence createManyAndReturn
   */
  export type StorySentenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * The data used to create many StorySentences.
     */
    data: StorySentenceCreateManyInput | StorySentenceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StorySentence update
   */
  export type StorySentenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    /**
     * The data needed to update a StorySentence.
     */
    data: XOR<StorySentenceUpdateInput, StorySentenceUncheckedUpdateInput>
    /**
     * Choose, which StorySentence to update.
     */
    where: StorySentenceWhereUniqueInput
  }

  /**
   * StorySentence updateMany
   */
  export type StorySentenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StorySentences.
     */
    data: XOR<StorySentenceUpdateManyMutationInput, StorySentenceUncheckedUpdateManyInput>
    /**
     * Filter which StorySentences to update
     */
    where?: StorySentenceWhereInput
    /**
     * Limit how many StorySentences to update.
     */
    limit?: number
  }

  /**
   * StorySentence updateManyAndReturn
   */
  export type StorySentenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * The data used to update StorySentences.
     */
    data: XOR<StorySentenceUpdateManyMutationInput, StorySentenceUncheckedUpdateManyInput>
    /**
     * Filter which StorySentences to update
     */
    where?: StorySentenceWhereInput
    /**
     * Limit how many StorySentences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StorySentence upsert
   */
  export type StorySentenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    /**
     * The filter to search for the StorySentence to update in case it exists.
     */
    where: StorySentenceWhereUniqueInput
    /**
     * In case the StorySentence found by the `where` argument doesn't exist, create a new StorySentence with this data.
     */
    create: XOR<StorySentenceCreateInput, StorySentenceUncheckedCreateInput>
    /**
     * In case the StorySentence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StorySentenceUpdateInput, StorySentenceUncheckedUpdateInput>
  }

  /**
   * StorySentence delete
   */
  export type StorySentenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
    /**
     * Filter which StorySentence to delete.
     */
    where: StorySentenceWhereUniqueInput
  }

  /**
   * StorySentence deleteMany
   */
  export type StorySentenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorySentences to delete
     */
    where?: StorySentenceWhereInput
    /**
     * Limit how many StorySentences to delete.
     */
    limit?: number
  }

  /**
   * StorySentence without action
   */
  export type StorySentenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorySentence
     */
    select?: StorySentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorySentence
     */
    omit?: StorySentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorySentenceInclude<ExtArgs> | null
  }


  /**
   * Model EvaluationRun
   */

  export type AggregateEvaluationRun = {
    _count: EvaluationRunCountAggregateOutputType | null
    _avg: EvaluationRunAvgAggregateOutputType | null
    _sum: EvaluationRunSumAggregateOutputType | null
    _min: EvaluationRunMinAggregateOutputType | null
    _max: EvaluationRunMaxAggregateOutputType | null
  }

  export type EvaluationRunAvgAggregateOutputType = {
    docCount: number | null
  }

  export type EvaluationRunSumAggregateOutputType = {
    docCount: number | null
  }

  export type EvaluationRunMinAggregateOutputType = {
    id: string | null
    type: string | null
    docCount: number | null
    metricsJson: string | null
    createdAt: Date | null
  }

  export type EvaluationRunMaxAggregateOutputType = {
    id: string | null
    type: string | null
    docCount: number | null
    metricsJson: string | null
    createdAt: Date | null
  }

  export type EvaluationRunCountAggregateOutputType = {
    id: number
    type: number
    docCount: number
    metricsJson: number
    createdAt: number
    _all: number
  }


  export type EvaluationRunAvgAggregateInputType = {
    docCount?: true
  }

  export type EvaluationRunSumAggregateInputType = {
    docCount?: true
  }

  export type EvaluationRunMinAggregateInputType = {
    id?: true
    type?: true
    docCount?: true
    metricsJson?: true
    createdAt?: true
  }

  export type EvaluationRunMaxAggregateInputType = {
    id?: true
    type?: true
    docCount?: true
    metricsJson?: true
    createdAt?: true
  }

  export type EvaluationRunCountAggregateInputType = {
    id?: true
    type?: true
    docCount?: true
    metricsJson?: true
    createdAt?: true
    _all?: true
  }

  export type EvaluationRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvaluationRun to aggregate.
     */
    where?: EvaluationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationRuns to fetch.
     */
    orderBy?: EvaluationRunOrderByWithRelationInput | EvaluationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvaluationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EvaluationRuns
    **/
    _count?: true | EvaluationRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EvaluationRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EvaluationRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvaluationRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvaluationRunMaxAggregateInputType
  }

  export type GetEvaluationRunAggregateType<T extends EvaluationRunAggregateArgs> = {
        [P in keyof T & keyof AggregateEvaluationRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvaluationRun[P]>
      : GetScalarType<T[P], AggregateEvaluationRun[P]>
  }




  export type EvaluationRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationRunWhereInput
    orderBy?: EvaluationRunOrderByWithAggregationInput | EvaluationRunOrderByWithAggregationInput[]
    by: EvaluationRunScalarFieldEnum[] | EvaluationRunScalarFieldEnum
    having?: EvaluationRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvaluationRunCountAggregateInputType | true
    _avg?: EvaluationRunAvgAggregateInputType
    _sum?: EvaluationRunSumAggregateInputType
    _min?: EvaluationRunMinAggregateInputType
    _max?: EvaluationRunMaxAggregateInputType
  }

  export type EvaluationRunGroupByOutputType = {
    id: string
    type: string
    docCount: number
    metricsJson: string
    createdAt: Date
    _count: EvaluationRunCountAggregateOutputType | null
    _avg: EvaluationRunAvgAggregateOutputType | null
    _sum: EvaluationRunSumAggregateOutputType | null
    _min: EvaluationRunMinAggregateOutputType | null
    _max: EvaluationRunMaxAggregateOutputType | null
  }

  type GetEvaluationRunGroupByPayload<T extends EvaluationRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvaluationRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvaluationRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvaluationRunGroupByOutputType[P]>
            : GetScalarType<T[P], EvaluationRunGroupByOutputType[P]>
        }
      >
    >


  export type EvaluationRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    docCount?: boolean
    metricsJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["evaluationRun"]>

  export type EvaluationRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    docCount?: boolean
    metricsJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["evaluationRun"]>

  export type EvaluationRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    docCount?: boolean
    metricsJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["evaluationRun"]>

  export type EvaluationRunSelectScalar = {
    id?: boolean
    type?: boolean
    docCount?: boolean
    metricsJson?: boolean
    createdAt?: boolean
  }

  export type EvaluationRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "docCount" | "metricsJson" | "createdAt", ExtArgs["result"]["evaluationRun"]>

  export type $EvaluationRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EvaluationRun"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      docCount: number
      metricsJson: string
      createdAt: Date
    }, ExtArgs["result"]["evaluationRun"]>
    composites: {}
  }

  type EvaluationRunGetPayload<S extends boolean | null | undefined | EvaluationRunDefaultArgs> = $Result.GetResult<Prisma.$EvaluationRunPayload, S>

  type EvaluationRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvaluationRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvaluationRunCountAggregateInputType | true
    }

  export interface EvaluationRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EvaluationRun'], meta: { name: 'EvaluationRun' } }
    /**
     * Find zero or one EvaluationRun that matches the filter.
     * @param {EvaluationRunFindUniqueArgs} args - Arguments to find a EvaluationRun
     * @example
     * // Get one EvaluationRun
     * const evaluationRun = await prisma.evaluationRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvaluationRunFindUniqueArgs>(args: SelectSubset<T, EvaluationRunFindUniqueArgs<ExtArgs>>): Prisma__EvaluationRunClient<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EvaluationRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvaluationRunFindUniqueOrThrowArgs} args - Arguments to find a EvaluationRun
     * @example
     * // Get one EvaluationRun
     * const evaluationRun = await prisma.evaluationRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvaluationRunFindUniqueOrThrowArgs>(args: SelectSubset<T, EvaluationRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvaluationRunClient<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvaluationRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationRunFindFirstArgs} args - Arguments to find a EvaluationRun
     * @example
     * // Get one EvaluationRun
     * const evaluationRun = await prisma.evaluationRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvaluationRunFindFirstArgs>(args?: SelectSubset<T, EvaluationRunFindFirstArgs<ExtArgs>>): Prisma__EvaluationRunClient<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvaluationRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationRunFindFirstOrThrowArgs} args - Arguments to find a EvaluationRun
     * @example
     * // Get one EvaluationRun
     * const evaluationRun = await prisma.evaluationRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvaluationRunFindFirstOrThrowArgs>(args?: SelectSubset<T, EvaluationRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvaluationRunClient<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EvaluationRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EvaluationRuns
     * const evaluationRuns = await prisma.evaluationRun.findMany()
     * 
     * // Get first 10 EvaluationRuns
     * const evaluationRuns = await prisma.evaluationRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evaluationRunWithIdOnly = await prisma.evaluationRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvaluationRunFindManyArgs>(args?: SelectSubset<T, EvaluationRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EvaluationRun.
     * @param {EvaluationRunCreateArgs} args - Arguments to create a EvaluationRun.
     * @example
     * // Create one EvaluationRun
     * const EvaluationRun = await prisma.evaluationRun.create({
     *   data: {
     *     // ... data to create a EvaluationRun
     *   }
     * })
     * 
     */
    create<T extends EvaluationRunCreateArgs>(args: SelectSubset<T, EvaluationRunCreateArgs<ExtArgs>>): Prisma__EvaluationRunClient<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EvaluationRuns.
     * @param {EvaluationRunCreateManyArgs} args - Arguments to create many EvaluationRuns.
     * @example
     * // Create many EvaluationRuns
     * const evaluationRun = await prisma.evaluationRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvaluationRunCreateManyArgs>(args?: SelectSubset<T, EvaluationRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EvaluationRuns and returns the data saved in the database.
     * @param {EvaluationRunCreateManyAndReturnArgs} args - Arguments to create many EvaluationRuns.
     * @example
     * // Create many EvaluationRuns
     * const evaluationRun = await prisma.evaluationRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EvaluationRuns and only return the `id`
     * const evaluationRunWithIdOnly = await prisma.evaluationRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EvaluationRunCreateManyAndReturnArgs>(args?: SelectSubset<T, EvaluationRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EvaluationRun.
     * @param {EvaluationRunDeleteArgs} args - Arguments to delete one EvaluationRun.
     * @example
     * // Delete one EvaluationRun
     * const EvaluationRun = await prisma.evaluationRun.delete({
     *   where: {
     *     // ... filter to delete one EvaluationRun
     *   }
     * })
     * 
     */
    delete<T extends EvaluationRunDeleteArgs>(args: SelectSubset<T, EvaluationRunDeleteArgs<ExtArgs>>): Prisma__EvaluationRunClient<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EvaluationRun.
     * @param {EvaluationRunUpdateArgs} args - Arguments to update one EvaluationRun.
     * @example
     * // Update one EvaluationRun
     * const evaluationRun = await prisma.evaluationRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvaluationRunUpdateArgs>(args: SelectSubset<T, EvaluationRunUpdateArgs<ExtArgs>>): Prisma__EvaluationRunClient<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EvaluationRuns.
     * @param {EvaluationRunDeleteManyArgs} args - Arguments to filter EvaluationRuns to delete.
     * @example
     * // Delete a few EvaluationRuns
     * const { count } = await prisma.evaluationRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvaluationRunDeleteManyArgs>(args?: SelectSubset<T, EvaluationRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EvaluationRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EvaluationRuns
     * const evaluationRun = await prisma.evaluationRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvaluationRunUpdateManyArgs>(args: SelectSubset<T, EvaluationRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EvaluationRuns and returns the data updated in the database.
     * @param {EvaluationRunUpdateManyAndReturnArgs} args - Arguments to update many EvaluationRuns.
     * @example
     * // Update many EvaluationRuns
     * const evaluationRun = await prisma.evaluationRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EvaluationRuns and only return the `id`
     * const evaluationRunWithIdOnly = await prisma.evaluationRun.updateManyAndReturn({
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
    updateManyAndReturn<T extends EvaluationRunUpdateManyAndReturnArgs>(args: SelectSubset<T, EvaluationRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EvaluationRun.
     * @param {EvaluationRunUpsertArgs} args - Arguments to update or create a EvaluationRun.
     * @example
     * // Update or create a EvaluationRun
     * const evaluationRun = await prisma.evaluationRun.upsert({
     *   create: {
     *     // ... data to create a EvaluationRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EvaluationRun we want to update
     *   }
     * })
     */
    upsert<T extends EvaluationRunUpsertArgs>(args: SelectSubset<T, EvaluationRunUpsertArgs<ExtArgs>>): Prisma__EvaluationRunClient<$Result.GetResult<Prisma.$EvaluationRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EvaluationRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationRunCountArgs} args - Arguments to filter EvaluationRuns to count.
     * @example
     * // Count the number of EvaluationRuns
     * const count = await prisma.evaluationRun.count({
     *   where: {
     *     // ... the filter for the EvaluationRuns we want to count
     *   }
     * })
    **/
    count<T extends EvaluationRunCountArgs>(
      args?: Subset<T, EvaluationRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvaluationRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EvaluationRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EvaluationRunAggregateArgs>(args: Subset<T, EvaluationRunAggregateArgs>): Prisma.PrismaPromise<GetEvaluationRunAggregateType<T>>

    /**
     * Group by EvaluationRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationRunGroupByArgs} args - Group by arguments.
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
      T extends EvaluationRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvaluationRunGroupByArgs['orderBy'] }
        : { orderBy?: EvaluationRunGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EvaluationRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvaluationRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EvaluationRun model
   */
  readonly fields: EvaluationRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EvaluationRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvaluationRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the EvaluationRun model
   */
  interface EvaluationRunFieldRefs {
    readonly id: FieldRef<"EvaluationRun", 'String'>
    readonly type: FieldRef<"EvaluationRun", 'String'>
    readonly docCount: FieldRef<"EvaluationRun", 'Int'>
    readonly metricsJson: FieldRef<"EvaluationRun", 'String'>
    readonly createdAt: FieldRef<"EvaluationRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EvaluationRun findUnique
   */
  export type EvaluationRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * Filter, which EvaluationRun to fetch.
     */
    where: EvaluationRunWhereUniqueInput
  }

  /**
   * EvaluationRun findUniqueOrThrow
   */
  export type EvaluationRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * Filter, which EvaluationRun to fetch.
     */
    where: EvaluationRunWhereUniqueInput
  }

  /**
   * EvaluationRun findFirst
   */
  export type EvaluationRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * Filter, which EvaluationRun to fetch.
     */
    where?: EvaluationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationRuns to fetch.
     */
    orderBy?: EvaluationRunOrderByWithRelationInput | EvaluationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvaluationRuns.
     */
    cursor?: EvaluationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationRuns.
     */
    distinct?: EvaluationRunScalarFieldEnum | EvaluationRunScalarFieldEnum[]
  }

  /**
   * EvaluationRun findFirstOrThrow
   */
  export type EvaluationRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * Filter, which EvaluationRun to fetch.
     */
    where?: EvaluationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationRuns to fetch.
     */
    orderBy?: EvaluationRunOrderByWithRelationInput | EvaluationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvaluationRuns.
     */
    cursor?: EvaluationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationRuns.
     */
    distinct?: EvaluationRunScalarFieldEnum | EvaluationRunScalarFieldEnum[]
  }

  /**
   * EvaluationRun findMany
   */
  export type EvaluationRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * Filter, which EvaluationRuns to fetch.
     */
    where?: EvaluationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationRuns to fetch.
     */
    orderBy?: EvaluationRunOrderByWithRelationInput | EvaluationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EvaluationRuns.
     */
    cursor?: EvaluationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationRuns.
     */
    distinct?: EvaluationRunScalarFieldEnum | EvaluationRunScalarFieldEnum[]
  }

  /**
   * EvaluationRun create
   */
  export type EvaluationRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * The data needed to create a EvaluationRun.
     */
    data: XOR<EvaluationRunCreateInput, EvaluationRunUncheckedCreateInput>
  }

  /**
   * EvaluationRun createMany
   */
  export type EvaluationRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EvaluationRuns.
     */
    data: EvaluationRunCreateManyInput | EvaluationRunCreateManyInput[]
  }

  /**
   * EvaluationRun createManyAndReturn
   */
  export type EvaluationRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * The data used to create many EvaluationRuns.
     */
    data: EvaluationRunCreateManyInput | EvaluationRunCreateManyInput[]
  }

  /**
   * EvaluationRun update
   */
  export type EvaluationRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * The data needed to update a EvaluationRun.
     */
    data: XOR<EvaluationRunUpdateInput, EvaluationRunUncheckedUpdateInput>
    /**
     * Choose, which EvaluationRun to update.
     */
    where: EvaluationRunWhereUniqueInput
  }

  /**
   * EvaluationRun updateMany
   */
  export type EvaluationRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EvaluationRuns.
     */
    data: XOR<EvaluationRunUpdateManyMutationInput, EvaluationRunUncheckedUpdateManyInput>
    /**
     * Filter which EvaluationRuns to update
     */
    where?: EvaluationRunWhereInput
    /**
     * Limit how many EvaluationRuns to update.
     */
    limit?: number
  }

  /**
   * EvaluationRun updateManyAndReturn
   */
  export type EvaluationRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * The data used to update EvaluationRuns.
     */
    data: XOR<EvaluationRunUpdateManyMutationInput, EvaluationRunUncheckedUpdateManyInput>
    /**
     * Filter which EvaluationRuns to update
     */
    where?: EvaluationRunWhereInput
    /**
     * Limit how many EvaluationRuns to update.
     */
    limit?: number
  }

  /**
   * EvaluationRun upsert
   */
  export type EvaluationRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * The filter to search for the EvaluationRun to update in case it exists.
     */
    where: EvaluationRunWhereUniqueInput
    /**
     * In case the EvaluationRun found by the `where` argument doesn't exist, create a new EvaluationRun with this data.
     */
    create: XOR<EvaluationRunCreateInput, EvaluationRunUncheckedCreateInput>
    /**
     * In case the EvaluationRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvaluationRunUpdateInput, EvaluationRunUncheckedUpdateInput>
  }

  /**
   * EvaluationRun delete
   */
  export type EvaluationRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
    /**
     * Filter which EvaluationRun to delete.
     */
    where: EvaluationRunWhereUniqueInput
  }

  /**
   * EvaluationRun deleteMany
   */
  export type EvaluationRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvaluationRuns to delete
     */
    where?: EvaluationRunWhereInput
    /**
     * Limit how many EvaluationRuns to delete.
     */
    limit?: number
  }

  /**
   * EvaluationRun without action
   */
  export type EvaluationRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationRun
     */
    select?: EvaluationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationRun
     */
    omit?: EvaluationRunOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    status: 'status',
    truncated: 'truncated',
    error: 'error',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const SentenceScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    index: 'index',
    text: 'text'
  };

  export type SentenceScalarFieldEnum = (typeof SentenceScalarFieldEnum)[keyof typeof SentenceScalarFieldEnum]


  export const UserStoryScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    storyCode: 'storyCode',
    actor: 'actor',
    action: 'action',
    benefit: 'benefit',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserStoryScalarFieldEnum = (typeof UserStoryScalarFieldEnum)[keyof typeof UserStoryScalarFieldEnum]


  export const StorySentenceScalarFieldEnum: {
    id: 'id',
    storyId: 'storyId',
    sentenceId: 'sentenceId',
    llmVerdict: 'llmVerdict',
    confidenceScore: 'confidenceScore',
    llmReason: 'llmReason',
    embeddingSimilarity: 'embeddingSimilarity',
    verificationStatus: 'verificationStatus'
  };

  export type StorySentenceScalarFieldEnum = (typeof StorySentenceScalarFieldEnum)[keyof typeof StorySentenceScalarFieldEnum]


  export const EvaluationRunScalarFieldEnum: {
    id: 'id',
    type: 'type',
    docCount: 'docCount',
    metricsJson: 'metricsJson',
    createdAt: 'createdAt'
  };

  export type EvaluationRunScalarFieldEnum = (typeof EvaluationRunScalarFieldEnum)[keyof typeof EvaluationRunScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    title?: StringFilter<"Document"> | string
    content?: StringFilter<"Document"> | string
    status?: StringFilter<"Document"> | string
    truncated?: BoolFilter<"Document"> | boolean
    error?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    sentences?: SentenceListRelationFilter
    userStories?: UserStoryListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    truncated?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentences?: SentenceOrderByRelationAggregateInput
    userStories?: UserStoryOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    title?: StringFilter<"Document"> | string
    content?: StringFilter<"Document"> | string
    status?: StringFilter<"Document"> | string
    truncated?: BoolFilter<"Document"> | boolean
    error?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    sentences?: SentenceListRelationFilter
    userStories?: UserStoryListRelationFilter
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    truncated?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    title?: StringWithAggregatesFilter<"Document"> | string
    content?: StringWithAggregatesFilter<"Document"> | string
    status?: StringWithAggregatesFilter<"Document"> | string
    truncated?: BoolWithAggregatesFilter<"Document"> | boolean
    error?: StringNullableWithAggregatesFilter<"Document"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type SentenceWhereInput = {
    AND?: SentenceWhereInput | SentenceWhereInput[]
    OR?: SentenceWhereInput[]
    NOT?: SentenceWhereInput | SentenceWhereInput[]
    id?: StringFilter<"Sentence"> | string
    documentId?: StringFilter<"Sentence"> | string
    index?: IntFilter<"Sentence"> | number
    text?: StringFilter<"Sentence"> | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    links?: StorySentenceListRelationFilter
  }

  export type SentenceOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    index?: SortOrder
    text?: SortOrder
    document?: DocumentOrderByWithRelationInput
    links?: StorySentenceOrderByRelationAggregateInput
  }

  export type SentenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentId_index?: SentenceDocumentIdIndexCompoundUniqueInput
    AND?: SentenceWhereInput | SentenceWhereInput[]
    OR?: SentenceWhereInput[]
    NOT?: SentenceWhereInput | SentenceWhereInput[]
    documentId?: StringFilter<"Sentence"> | string
    index?: IntFilter<"Sentence"> | number
    text?: StringFilter<"Sentence"> | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    links?: StorySentenceListRelationFilter
  }, "id" | "documentId_index">

  export type SentenceOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    index?: SortOrder
    text?: SortOrder
    _count?: SentenceCountOrderByAggregateInput
    _avg?: SentenceAvgOrderByAggregateInput
    _max?: SentenceMaxOrderByAggregateInput
    _min?: SentenceMinOrderByAggregateInput
    _sum?: SentenceSumOrderByAggregateInput
  }

  export type SentenceScalarWhereWithAggregatesInput = {
    AND?: SentenceScalarWhereWithAggregatesInput | SentenceScalarWhereWithAggregatesInput[]
    OR?: SentenceScalarWhereWithAggregatesInput[]
    NOT?: SentenceScalarWhereWithAggregatesInput | SentenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sentence"> | string
    documentId?: StringWithAggregatesFilter<"Sentence"> | string
    index?: IntWithAggregatesFilter<"Sentence"> | number
    text?: StringWithAggregatesFilter<"Sentence"> | string
  }

  export type UserStoryWhereInput = {
    AND?: UserStoryWhereInput | UserStoryWhereInput[]
    OR?: UserStoryWhereInput[]
    NOT?: UserStoryWhereInput | UserStoryWhereInput[]
    id?: StringFilter<"UserStory"> | string
    documentId?: StringFilter<"UserStory"> | string
    storyCode?: StringFilter<"UserStory"> | string
    actor?: StringFilter<"UserStory"> | string
    action?: StringFilter<"UserStory"> | string
    benefit?: StringFilter<"UserStory"> | string
    status?: StringFilter<"UserStory"> | string
    createdAt?: DateTimeFilter<"UserStory"> | Date | string
    updatedAt?: DateTimeFilter<"UserStory"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    storySentences?: StorySentenceListRelationFilter
  }

  export type UserStoryOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    storyCode?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    benefit?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    document?: DocumentOrderByWithRelationInput
    storySentences?: StorySentenceOrderByRelationAggregateInput
  }

  export type UserStoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserStoryWhereInput | UserStoryWhereInput[]
    OR?: UserStoryWhereInput[]
    NOT?: UserStoryWhereInput | UserStoryWhereInput[]
    documentId?: StringFilter<"UserStory"> | string
    storyCode?: StringFilter<"UserStory"> | string
    actor?: StringFilter<"UserStory"> | string
    action?: StringFilter<"UserStory"> | string
    benefit?: StringFilter<"UserStory"> | string
    status?: StringFilter<"UserStory"> | string
    createdAt?: DateTimeFilter<"UserStory"> | Date | string
    updatedAt?: DateTimeFilter<"UserStory"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    storySentences?: StorySentenceListRelationFilter
  }, "id">

  export type UserStoryOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    storyCode?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    benefit?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserStoryCountOrderByAggregateInput
    _max?: UserStoryMaxOrderByAggregateInput
    _min?: UserStoryMinOrderByAggregateInput
  }

  export type UserStoryScalarWhereWithAggregatesInput = {
    AND?: UserStoryScalarWhereWithAggregatesInput | UserStoryScalarWhereWithAggregatesInput[]
    OR?: UserStoryScalarWhereWithAggregatesInput[]
    NOT?: UserStoryScalarWhereWithAggregatesInput | UserStoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserStory"> | string
    documentId?: StringWithAggregatesFilter<"UserStory"> | string
    storyCode?: StringWithAggregatesFilter<"UserStory"> | string
    actor?: StringWithAggregatesFilter<"UserStory"> | string
    action?: StringWithAggregatesFilter<"UserStory"> | string
    benefit?: StringWithAggregatesFilter<"UserStory"> | string
    status?: StringWithAggregatesFilter<"UserStory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserStory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserStory"> | Date | string
  }

  export type StorySentenceWhereInput = {
    AND?: StorySentenceWhereInput | StorySentenceWhereInput[]
    OR?: StorySentenceWhereInput[]
    NOT?: StorySentenceWhereInput | StorySentenceWhereInput[]
    id?: StringFilter<"StorySentence"> | string
    storyId?: StringFilter<"StorySentence"> | string
    sentenceId?: StringFilter<"StorySentence"> | string
    llmVerdict?: BoolFilter<"StorySentence"> | boolean
    confidenceScore?: FloatNullableFilter<"StorySentence"> | number | null
    llmReason?: StringNullableFilter<"StorySentence"> | string | null
    embeddingSimilarity?: FloatNullableFilter<"StorySentence"> | number | null
    verificationStatus?: StringFilter<"StorySentence"> | string
    story?: XOR<UserStoryScalarRelationFilter, UserStoryWhereInput>
    sentence?: XOR<SentenceScalarRelationFilter, SentenceWhereInput>
  }

  export type StorySentenceOrderByWithRelationInput = {
    id?: SortOrder
    storyId?: SortOrder
    sentenceId?: SortOrder
    llmVerdict?: SortOrder
    confidenceScore?: SortOrderInput | SortOrder
    llmReason?: SortOrderInput | SortOrder
    embeddingSimilarity?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    story?: UserStoryOrderByWithRelationInput
    sentence?: SentenceOrderByWithRelationInput
  }

  export type StorySentenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    storyId_sentenceId?: StorySentenceStoryIdSentenceIdCompoundUniqueInput
    AND?: StorySentenceWhereInput | StorySentenceWhereInput[]
    OR?: StorySentenceWhereInput[]
    NOT?: StorySentenceWhereInput | StorySentenceWhereInput[]
    storyId?: StringFilter<"StorySentence"> | string
    sentenceId?: StringFilter<"StorySentence"> | string
    llmVerdict?: BoolFilter<"StorySentence"> | boolean
    confidenceScore?: FloatNullableFilter<"StorySentence"> | number | null
    llmReason?: StringNullableFilter<"StorySentence"> | string | null
    embeddingSimilarity?: FloatNullableFilter<"StorySentence"> | number | null
    verificationStatus?: StringFilter<"StorySentence"> | string
    story?: XOR<UserStoryScalarRelationFilter, UserStoryWhereInput>
    sentence?: XOR<SentenceScalarRelationFilter, SentenceWhereInput>
  }, "id" | "storyId_sentenceId">

  export type StorySentenceOrderByWithAggregationInput = {
    id?: SortOrder
    storyId?: SortOrder
    sentenceId?: SortOrder
    llmVerdict?: SortOrder
    confidenceScore?: SortOrderInput | SortOrder
    llmReason?: SortOrderInput | SortOrder
    embeddingSimilarity?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    _count?: StorySentenceCountOrderByAggregateInput
    _avg?: StorySentenceAvgOrderByAggregateInput
    _max?: StorySentenceMaxOrderByAggregateInput
    _min?: StorySentenceMinOrderByAggregateInput
    _sum?: StorySentenceSumOrderByAggregateInput
  }

  export type StorySentenceScalarWhereWithAggregatesInput = {
    AND?: StorySentenceScalarWhereWithAggregatesInput | StorySentenceScalarWhereWithAggregatesInput[]
    OR?: StorySentenceScalarWhereWithAggregatesInput[]
    NOT?: StorySentenceScalarWhereWithAggregatesInput | StorySentenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StorySentence"> | string
    storyId?: StringWithAggregatesFilter<"StorySentence"> | string
    sentenceId?: StringWithAggregatesFilter<"StorySentence"> | string
    llmVerdict?: BoolWithAggregatesFilter<"StorySentence"> | boolean
    confidenceScore?: FloatNullableWithAggregatesFilter<"StorySentence"> | number | null
    llmReason?: StringNullableWithAggregatesFilter<"StorySentence"> | string | null
    embeddingSimilarity?: FloatNullableWithAggregatesFilter<"StorySentence"> | number | null
    verificationStatus?: StringWithAggregatesFilter<"StorySentence"> | string
  }

  export type EvaluationRunWhereInput = {
    AND?: EvaluationRunWhereInput | EvaluationRunWhereInput[]
    OR?: EvaluationRunWhereInput[]
    NOT?: EvaluationRunWhereInput | EvaluationRunWhereInput[]
    id?: StringFilter<"EvaluationRun"> | string
    type?: StringFilter<"EvaluationRun"> | string
    docCount?: IntFilter<"EvaluationRun"> | number
    metricsJson?: StringFilter<"EvaluationRun"> | string
    createdAt?: DateTimeFilter<"EvaluationRun"> | Date | string
  }

  export type EvaluationRunOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    docCount?: SortOrder
    metricsJson?: SortOrder
    createdAt?: SortOrder
  }

  export type EvaluationRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EvaluationRunWhereInput | EvaluationRunWhereInput[]
    OR?: EvaluationRunWhereInput[]
    NOT?: EvaluationRunWhereInput | EvaluationRunWhereInput[]
    type?: StringFilter<"EvaluationRun"> | string
    docCount?: IntFilter<"EvaluationRun"> | number
    metricsJson?: StringFilter<"EvaluationRun"> | string
    createdAt?: DateTimeFilter<"EvaluationRun"> | Date | string
  }, "id">

  export type EvaluationRunOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    docCount?: SortOrder
    metricsJson?: SortOrder
    createdAt?: SortOrder
    _count?: EvaluationRunCountOrderByAggregateInput
    _avg?: EvaluationRunAvgOrderByAggregateInput
    _max?: EvaluationRunMaxOrderByAggregateInput
    _min?: EvaluationRunMinOrderByAggregateInput
    _sum?: EvaluationRunSumOrderByAggregateInput
  }

  export type EvaluationRunScalarWhereWithAggregatesInput = {
    AND?: EvaluationRunScalarWhereWithAggregatesInput | EvaluationRunScalarWhereWithAggregatesInput[]
    OR?: EvaluationRunScalarWhereWithAggregatesInput[]
    NOT?: EvaluationRunScalarWhereWithAggregatesInput | EvaluationRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EvaluationRun"> | string
    type?: StringWithAggregatesFilter<"EvaluationRun"> | string
    docCount?: IntWithAggregatesFilter<"EvaluationRun"> | number
    metricsJson?: StringWithAggregatesFilter<"EvaluationRun"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EvaluationRun"> | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    title: string
    content: string
    status?: string
    truncated?: boolean
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentences?: SentenceCreateNestedManyWithoutDocumentInput
    userStories?: UserStoryCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    status?: string
    truncated?: boolean
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentences?: SentenceUncheckedCreateNestedManyWithoutDocumentInput
    userStories?: UserStoryUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    truncated?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentences?: SentenceUpdateManyWithoutDocumentNestedInput
    userStories?: UserStoryUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    truncated?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentences?: SentenceUncheckedUpdateManyWithoutDocumentNestedInput
    userStories?: UserStoryUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    title: string
    content: string
    status?: string
    truncated?: boolean
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    truncated?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    truncated?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SentenceCreateInput = {
    id?: string
    index: number
    text: string
    document: DocumentCreateNestedOneWithoutSentencesInput
    links?: StorySentenceCreateNestedManyWithoutSentenceInput
  }

  export type SentenceUncheckedCreateInput = {
    id?: string
    documentId: string
    index: number
    text: string
    links?: StorySentenceUncheckedCreateNestedManyWithoutSentenceInput
  }

  export type SentenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    document?: DocumentUpdateOneRequiredWithoutSentencesNestedInput
    links?: StorySentenceUpdateManyWithoutSentenceNestedInput
  }

  export type SentenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    links?: StorySentenceUncheckedUpdateManyWithoutSentenceNestedInput
  }

  export type SentenceCreateManyInput = {
    id?: string
    documentId: string
    index: number
    text: string
  }

  export type SentenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
  }

  export type SentenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
  }

  export type UserStoryCreateInput = {
    id?: string
    storyCode: string
    actor: string
    action: string
    benefit: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    document: DocumentCreateNestedOneWithoutUserStoriesInput
    storySentences?: StorySentenceCreateNestedManyWithoutStoryInput
  }

  export type UserStoryUncheckedCreateInput = {
    id?: string
    documentId: string
    storyCode: string
    actor: string
    action: string
    benefit: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storySentences?: StorySentenceUncheckedCreateNestedManyWithoutStoryInput
  }

  export type UserStoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storyCode?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    benefit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutUserStoriesNestedInput
    storySentences?: StorySentenceUpdateManyWithoutStoryNestedInput
  }

  export type UserStoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    storyCode?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    benefit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storySentences?: StorySentenceUncheckedUpdateManyWithoutStoryNestedInput
  }

  export type UserStoryCreateManyInput = {
    id?: string
    documentId: string
    storyCode: string
    actor: string
    action: string
    benefit: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    storyCode?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    benefit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    storyCode?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    benefit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorySentenceCreateInput = {
    id?: string
    llmVerdict: boolean
    confidenceScore?: number | null
    llmReason?: string | null
    embeddingSimilarity?: number | null
    verificationStatus?: string
    story: UserStoryCreateNestedOneWithoutStorySentencesInput
    sentence: SentenceCreateNestedOneWithoutLinksInput
  }

  export type StorySentenceUncheckedCreateInput = {
    id?: string
    storyId: string
    sentenceId: string
    llmVerdict: boolean
    confidenceScore?: number | null
    llmReason?: string | null
    embeddingSimilarity?: number | null
    verificationStatus?: string
  }

  export type StorySentenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    llmVerdict?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    llmReason?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingSimilarity?: NullableFloatFieldUpdateOperationsInput | number | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    story?: UserStoryUpdateOneRequiredWithoutStorySentencesNestedInput
    sentence?: SentenceUpdateOneRequiredWithoutLinksNestedInput
  }

  export type StorySentenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storyId?: StringFieldUpdateOperationsInput | string
    sentenceId?: StringFieldUpdateOperationsInput | string
    llmVerdict?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    llmReason?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingSimilarity?: NullableFloatFieldUpdateOperationsInput | number | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
  }

  export type StorySentenceCreateManyInput = {
    id?: string
    storyId: string
    sentenceId: string
    llmVerdict: boolean
    confidenceScore?: number | null
    llmReason?: string | null
    embeddingSimilarity?: number | null
    verificationStatus?: string
  }

  export type StorySentenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    llmVerdict?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    llmReason?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingSimilarity?: NullableFloatFieldUpdateOperationsInput | number | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
  }

  export type StorySentenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    storyId?: StringFieldUpdateOperationsInput | string
    sentenceId?: StringFieldUpdateOperationsInput | string
    llmVerdict?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    llmReason?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingSimilarity?: NullableFloatFieldUpdateOperationsInput | number | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluationRunCreateInput = {
    id?: string
    type: string
    docCount: number
    metricsJson: string
    createdAt?: Date | string
  }

  export type EvaluationRunUncheckedCreateInput = {
    id?: string
    type: string
    docCount: number
    metricsJson: string
    createdAt?: Date | string
  }

  export type EvaluationRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    docCount?: IntFieldUpdateOperationsInput | number
    metricsJson?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    docCount?: IntFieldUpdateOperationsInput | number
    metricsJson?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationRunCreateManyInput = {
    id?: string
    type: string
    docCount: number
    metricsJson: string
    createdAt?: Date | string
  }

  export type EvaluationRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    docCount?: IntFieldUpdateOperationsInput | number
    metricsJson?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    docCount?: IntFieldUpdateOperationsInput | number
    metricsJson?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SentenceListRelationFilter = {
    every?: SentenceWhereInput
    some?: SentenceWhereInput
    none?: SentenceWhereInput
  }

  export type UserStoryListRelationFilter = {
    every?: UserStoryWhereInput
    some?: UserStoryWhereInput
    none?: UserStoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SentenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserStoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    truncated?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    truncated?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    truncated?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type StorySentenceListRelationFilter = {
    every?: StorySentenceWhereInput
    some?: StorySentenceWhereInput
    none?: StorySentenceWhereInput
  }

  export type StorySentenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SentenceDocumentIdIndexCompoundUniqueInput = {
    documentId: string
    index: number
  }

  export type SentenceCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    index?: SortOrder
    text?: SortOrder
  }

  export type SentenceAvgOrderByAggregateInput = {
    index?: SortOrder
  }

  export type SentenceMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    index?: SortOrder
    text?: SortOrder
  }

  export type SentenceMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    index?: SortOrder
    text?: SortOrder
  }

  export type SentenceSumOrderByAggregateInput = {
    index?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserStoryCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    storyCode?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    benefit?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStoryMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    storyCode?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    benefit?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStoryMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    storyCode?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    benefit?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserStoryScalarRelationFilter = {
    is?: UserStoryWhereInput
    isNot?: UserStoryWhereInput
  }

  export type SentenceScalarRelationFilter = {
    is?: SentenceWhereInput
    isNot?: SentenceWhereInput
  }

  export type StorySentenceStoryIdSentenceIdCompoundUniqueInput = {
    storyId: string
    sentenceId: string
  }

  export type StorySentenceCountOrderByAggregateInput = {
    id?: SortOrder
    storyId?: SortOrder
    sentenceId?: SortOrder
    llmVerdict?: SortOrder
    confidenceScore?: SortOrder
    llmReason?: SortOrder
    embeddingSimilarity?: SortOrder
    verificationStatus?: SortOrder
  }

  export type StorySentenceAvgOrderByAggregateInput = {
    confidenceScore?: SortOrder
    embeddingSimilarity?: SortOrder
  }

  export type StorySentenceMaxOrderByAggregateInput = {
    id?: SortOrder
    storyId?: SortOrder
    sentenceId?: SortOrder
    llmVerdict?: SortOrder
    confidenceScore?: SortOrder
    llmReason?: SortOrder
    embeddingSimilarity?: SortOrder
    verificationStatus?: SortOrder
  }

  export type StorySentenceMinOrderByAggregateInput = {
    id?: SortOrder
    storyId?: SortOrder
    sentenceId?: SortOrder
    llmVerdict?: SortOrder
    confidenceScore?: SortOrder
    llmReason?: SortOrder
    embeddingSimilarity?: SortOrder
    verificationStatus?: SortOrder
  }

  export type StorySentenceSumOrderByAggregateInput = {
    confidenceScore?: SortOrder
    embeddingSimilarity?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type EvaluationRunCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    docCount?: SortOrder
    metricsJson?: SortOrder
    createdAt?: SortOrder
  }

  export type EvaluationRunAvgOrderByAggregateInput = {
    docCount?: SortOrder
  }

  export type EvaluationRunMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    docCount?: SortOrder
    metricsJson?: SortOrder
    createdAt?: SortOrder
  }

  export type EvaluationRunMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    docCount?: SortOrder
    metricsJson?: SortOrder
    createdAt?: SortOrder
  }

  export type EvaluationRunSumOrderByAggregateInput = {
    docCount?: SortOrder
  }

  export type SentenceCreateNestedManyWithoutDocumentInput = {
    create?: XOR<SentenceCreateWithoutDocumentInput, SentenceUncheckedCreateWithoutDocumentInput> | SentenceCreateWithoutDocumentInput[] | SentenceUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SentenceCreateOrConnectWithoutDocumentInput | SentenceCreateOrConnectWithoutDocumentInput[]
    createMany?: SentenceCreateManyDocumentInputEnvelope
    connect?: SentenceWhereUniqueInput | SentenceWhereUniqueInput[]
  }

  export type UserStoryCreateNestedManyWithoutDocumentInput = {
    create?: XOR<UserStoryCreateWithoutDocumentInput, UserStoryUncheckedCreateWithoutDocumentInput> | UserStoryCreateWithoutDocumentInput[] | UserStoryUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: UserStoryCreateOrConnectWithoutDocumentInput | UserStoryCreateOrConnectWithoutDocumentInput[]
    createMany?: UserStoryCreateManyDocumentInputEnvelope
    connect?: UserStoryWhereUniqueInput | UserStoryWhereUniqueInput[]
  }

  export type SentenceUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<SentenceCreateWithoutDocumentInput, SentenceUncheckedCreateWithoutDocumentInput> | SentenceCreateWithoutDocumentInput[] | SentenceUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SentenceCreateOrConnectWithoutDocumentInput | SentenceCreateOrConnectWithoutDocumentInput[]
    createMany?: SentenceCreateManyDocumentInputEnvelope
    connect?: SentenceWhereUniqueInput | SentenceWhereUniqueInput[]
  }

  export type UserStoryUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<UserStoryCreateWithoutDocumentInput, UserStoryUncheckedCreateWithoutDocumentInput> | UserStoryCreateWithoutDocumentInput[] | UserStoryUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: UserStoryCreateOrConnectWithoutDocumentInput | UserStoryCreateOrConnectWithoutDocumentInput[]
    createMany?: UserStoryCreateManyDocumentInputEnvelope
    connect?: UserStoryWhereUniqueInput | UserStoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SentenceUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<SentenceCreateWithoutDocumentInput, SentenceUncheckedCreateWithoutDocumentInput> | SentenceCreateWithoutDocumentInput[] | SentenceUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SentenceCreateOrConnectWithoutDocumentInput | SentenceCreateOrConnectWithoutDocumentInput[]
    upsert?: SentenceUpsertWithWhereUniqueWithoutDocumentInput | SentenceUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: SentenceCreateManyDocumentInputEnvelope
    set?: SentenceWhereUniqueInput | SentenceWhereUniqueInput[]
    disconnect?: SentenceWhereUniqueInput | SentenceWhereUniqueInput[]
    delete?: SentenceWhereUniqueInput | SentenceWhereUniqueInput[]
    connect?: SentenceWhereUniqueInput | SentenceWhereUniqueInput[]
    update?: SentenceUpdateWithWhereUniqueWithoutDocumentInput | SentenceUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: SentenceUpdateManyWithWhereWithoutDocumentInput | SentenceUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: SentenceScalarWhereInput | SentenceScalarWhereInput[]
  }

  export type UserStoryUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<UserStoryCreateWithoutDocumentInput, UserStoryUncheckedCreateWithoutDocumentInput> | UserStoryCreateWithoutDocumentInput[] | UserStoryUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: UserStoryCreateOrConnectWithoutDocumentInput | UserStoryCreateOrConnectWithoutDocumentInput[]
    upsert?: UserStoryUpsertWithWhereUniqueWithoutDocumentInput | UserStoryUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: UserStoryCreateManyDocumentInputEnvelope
    set?: UserStoryWhereUniqueInput | UserStoryWhereUniqueInput[]
    disconnect?: UserStoryWhereUniqueInput | UserStoryWhereUniqueInput[]
    delete?: UserStoryWhereUniqueInput | UserStoryWhereUniqueInput[]
    connect?: UserStoryWhereUniqueInput | UserStoryWhereUniqueInput[]
    update?: UserStoryUpdateWithWhereUniqueWithoutDocumentInput | UserStoryUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: UserStoryUpdateManyWithWhereWithoutDocumentInput | UserStoryUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: UserStoryScalarWhereInput | UserStoryScalarWhereInput[]
  }

  export type SentenceUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<SentenceCreateWithoutDocumentInput, SentenceUncheckedCreateWithoutDocumentInput> | SentenceCreateWithoutDocumentInput[] | SentenceUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SentenceCreateOrConnectWithoutDocumentInput | SentenceCreateOrConnectWithoutDocumentInput[]
    upsert?: SentenceUpsertWithWhereUniqueWithoutDocumentInput | SentenceUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: SentenceCreateManyDocumentInputEnvelope
    set?: SentenceWhereUniqueInput | SentenceWhereUniqueInput[]
    disconnect?: SentenceWhereUniqueInput | SentenceWhereUniqueInput[]
    delete?: SentenceWhereUniqueInput | SentenceWhereUniqueInput[]
    connect?: SentenceWhereUniqueInput | SentenceWhereUniqueInput[]
    update?: SentenceUpdateWithWhereUniqueWithoutDocumentInput | SentenceUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: SentenceUpdateManyWithWhereWithoutDocumentInput | SentenceUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: SentenceScalarWhereInput | SentenceScalarWhereInput[]
  }

  export type UserStoryUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<UserStoryCreateWithoutDocumentInput, UserStoryUncheckedCreateWithoutDocumentInput> | UserStoryCreateWithoutDocumentInput[] | UserStoryUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: UserStoryCreateOrConnectWithoutDocumentInput | UserStoryCreateOrConnectWithoutDocumentInput[]
    upsert?: UserStoryUpsertWithWhereUniqueWithoutDocumentInput | UserStoryUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: UserStoryCreateManyDocumentInputEnvelope
    set?: UserStoryWhereUniqueInput | UserStoryWhereUniqueInput[]
    disconnect?: UserStoryWhereUniqueInput | UserStoryWhereUniqueInput[]
    delete?: UserStoryWhereUniqueInput | UserStoryWhereUniqueInput[]
    connect?: UserStoryWhereUniqueInput | UserStoryWhereUniqueInput[]
    update?: UserStoryUpdateWithWhereUniqueWithoutDocumentInput | UserStoryUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: UserStoryUpdateManyWithWhereWithoutDocumentInput | UserStoryUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: UserStoryScalarWhereInput | UserStoryScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutSentencesInput = {
    create?: XOR<DocumentCreateWithoutSentencesInput, DocumentUncheckedCreateWithoutSentencesInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutSentencesInput
    connect?: DocumentWhereUniqueInput
  }

  export type StorySentenceCreateNestedManyWithoutSentenceInput = {
    create?: XOR<StorySentenceCreateWithoutSentenceInput, StorySentenceUncheckedCreateWithoutSentenceInput> | StorySentenceCreateWithoutSentenceInput[] | StorySentenceUncheckedCreateWithoutSentenceInput[]
    connectOrCreate?: StorySentenceCreateOrConnectWithoutSentenceInput | StorySentenceCreateOrConnectWithoutSentenceInput[]
    createMany?: StorySentenceCreateManySentenceInputEnvelope
    connect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
  }

  export type StorySentenceUncheckedCreateNestedManyWithoutSentenceInput = {
    create?: XOR<StorySentenceCreateWithoutSentenceInput, StorySentenceUncheckedCreateWithoutSentenceInput> | StorySentenceCreateWithoutSentenceInput[] | StorySentenceUncheckedCreateWithoutSentenceInput[]
    connectOrCreate?: StorySentenceCreateOrConnectWithoutSentenceInput | StorySentenceCreateOrConnectWithoutSentenceInput[]
    createMany?: StorySentenceCreateManySentenceInputEnvelope
    connect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DocumentUpdateOneRequiredWithoutSentencesNestedInput = {
    create?: XOR<DocumentCreateWithoutSentencesInput, DocumentUncheckedCreateWithoutSentencesInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutSentencesInput
    upsert?: DocumentUpsertWithoutSentencesInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutSentencesInput, DocumentUpdateWithoutSentencesInput>, DocumentUncheckedUpdateWithoutSentencesInput>
  }

  export type StorySentenceUpdateManyWithoutSentenceNestedInput = {
    create?: XOR<StorySentenceCreateWithoutSentenceInput, StorySentenceUncheckedCreateWithoutSentenceInput> | StorySentenceCreateWithoutSentenceInput[] | StorySentenceUncheckedCreateWithoutSentenceInput[]
    connectOrCreate?: StorySentenceCreateOrConnectWithoutSentenceInput | StorySentenceCreateOrConnectWithoutSentenceInput[]
    upsert?: StorySentenceUpsertWithWhereUniqueWithoutSentenceInput | StorySentenceUpsertWithWhereUniqueWithoutSentenceInput[]
    createMany?: StorySentenceCreateManySentenceInputEnvelope
    set?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    disconnect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    delete?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    connect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    update?: StorySentenceUpdateWithWhereUniqueWithoutSentenceInput | StorySentenceUpdateWithWhereUniqueWithoutSentenceInput[]
    updateMany?: StorySentenceUpdateManyWithWhereWithoutSentenceInput | StorySentenceUpdateManyWithWhereWithoutSentenceInput[]
    deleteMany?: StorySentenceScalarWhereInput | StorySentenceScalarWhereInput[]
  }

  export type StorySentenceUncheckedUpdateManyWithoutSentenceNestedInput = {
    create?: XOR<StorySentenceCreateWithoutSentenceInput, StorySentenceUncheckedCreateWithoutSentenceInput> | StorySentenceCreateWithoutSentenceInput[] | StorySentenceUncheckedCreateWithoutSentenceInput[]
    connectOrCreate?: StorySentenceCreateOrConnectWithoutSentenceInput | StorySentenceCreateOrConnectWithoutSentenceInput[]
    upsert?: StorySentenceUpsertWithWhereUniqueWithoutSentenceInput | StorySentenceUpsertWithWhereUniqueWithoutSentenceInput[]
    createMany?: StorySentenceCreateManySentenceInputEnvelope
    set?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    disconnect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    delete?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    connect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    update?: StorySentenceUpdateWithWhereUniqueWithoutSentenceInput | StorySentenceUpdateWithWhereUniqueWithoutSentenceInput[]
    updateMany?: StorySentenceUpdateManyWithWhereWithoutSentenceInput | StorySentenceUpdateManyWithWhereWithoutSentenceInput[]
    deleteMany?: StorySentenceScalarWhereInput | StorySentenceScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutUserStoriesInput = {
    create?: XOR<DocumentCreateWithoutUserStoriesInput, DocumentUncheckedCreateWithoutUserStoriesInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutUserStoriesInput
    connect?: DocumentWhereUniqueInput
  }

  export type StorySentenceCreateNestedManyWithoutStoryInput = {
    create?: XOR<StorySentenceCreateWithoutStoryInput, StorySentenceUncheckedCreateWithoutStoryInput> | StorySentenceCreateWithoutStoryInput[] | StorySentenceUncheckedCreateWithoutStoryInput[]
    connectOrCreate?: StorySentenceCreateOrConnectWithoutStoryInput | StorySentenceCreateOrConnectWithoutStoryInput[]
    createMany?: StorySentenceCreateManyStoryInputEnvelope
    connect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
  }

  export type StorySentenceUncheckedCreateNestedManyWithoutStoryInput = {
    create?: XOR<StorySentenceCreateWithoutStoryInput, StorySentenceUncheckedCreateWithoutStoryInput> | StorySentenceCreateWithoutStoryInput[] | StorySentenceUncheckedCreateWithoutStoryInput[]
    connectOrCreate?: StorySentenceCreateOrConnectWithoutStoryInput | StorySentenceCreateOrConnectWithoutStoryInput[]
    createMany?: StorySentenceCreateManyStoryInputEnvelope
    connect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
  }

  export type DocumentUpdateOneRequiredWithoutUserStoriesNestedInput = {
    create?: XOR<DocumentCreateWithoutUserStoriesInput, DocumentUncheckedCreateWithoutUserStoriesInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutUserStoriesInput
    upsert?: DocumentUpsertWithoutUserStoriesInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutUserStoriesInput, DocumentUpdateWithoutUserStoriesInput>, DocumentUncheckedUpdateWithoutUserStoriesInput>
  }

  export type StorySentenceUpdateManyWithoutStoryNestedInput = {
    create?: XOR<StorySentenceCreateWithoutStoryInput, StorySentenceUncheckedCreateWithoutStoryInput> | StorySentenceCreateWithoutStoryInput[] | StorySentenceUncheckedCreateWithoutStoryInput[]
    connectOrCreate?: StorySentenceCreateOrConnectWithoutStoryInput | StorySentenceCreateOrConnectWithoutStoryInput[]
    upsert?: StorySentenceUpsertWithWhereUniqueWithoutStoryInput | StorySentenceUpsertWithWhereUniqueWithoutStoryInput[]
    createMany?: StorySentenceCreateManyStoryInputEnvelope
    set?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    disconnect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    delete?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    connect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    update?: StorySentenceUpdateWithWhereUniqueWithoutStoryInput | StorySentenceUpdateWithWhereUniqueWithoutStoryInput[]
    updateMany?: StorySentenceUpdateManyWithWhereWithoutStoryInput | StorySentenceUpdateManyWithWhereWithoutStoryInput[]
    deleteMany?: StorySentenceScalarWhereInput | StorySentenceScalarWhereInput[]
  }

  export type StorySentenceUncheckedUpdateManyWithoutStoryNestedInput = {
    create?: XOR<StorySentenceCreateWithoutStoryInput, StorySentenceUncheckedCreateWithoutStoryInput> | StorySentenceCreateWithoutStoryInput[] | StorySentenceUncheckedCreateWithoutStoryInput[]
    connectOrCreate?: StorySentenceCreateOrConnectWithoutStoryInput | StorySentenceCreateOrConnectWithoutStoryInput[]
    upsert?: StorySentenceUpsertWithWhereUniqueWithoutStoryInput | StorySentenceUpsertWithWhereUniqueWithoutStoryInput[]
    createMany?: StorySentenceCreateManyStoryInputEnvelope
    set?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    disconnect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    delete?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    connect?: StorySentenceWhereUniqueInput | StorySentenceWhereUniqueInput[]
    update?: StorySentenceUpdateWithWhereUniqueWithoutStoryInput | StorySentenceUpdateWithWhereUniqueWithoutStoryInput[]
    updateMany?: StorySentenceUpdateManyWithWhereWithoutStoryInput | StorySentenceUpdateManyWithWhereWithoutStoryInput[]
    deleteMany?: StorySentenceScalarWhereInput | StorySentenceScalarWhereInput[]
  }

  export type UserStoryCreateNestedOneWithoutStorySentencesInput = {
    create?: XOR<UserStoryCreateWithoutStorySentencesInput, UserStoryUncheckedCreateWithoutStorySentencesInput>
    connectOrCreate?: UserStoryCreateOrConnectWithoutStorySentencesInput
    connect?: UserStoryWhereUniqueInput
  }

  export type SentenceCreateNestedOneWithoutLinksInput = {
    create?: XOR<SentenceCreateWithoutLinksInput, SentenceUncheckedCreateWithoutLinksInput>
    connectOrCreate?: SentenceCreateOrConnectWithoutLinksInput
    connect?: SentenceWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserStoryUpdateOneRequiredWithoutStorySentencesNestedInput = {
    create?: XOR<UserStoryCreateWithoutStorySentencesInput, UserStoryUncheckedCreateWithoutStorySentencesInput>
    connectOrCreate?: UserStoryCreateOrConnectWithoutStorySentencesInput
    upsert?: UserStoryUpsertWithoutStorySentencesInput
    connect?: UserStoryWhereUniqueInput
    update?: XOR<XOR<UserStoryUpdateToOneWithWhereWithoutStorySentencesInput, UserStoryUpdateWithoutStorySentencesInput>, UserStoryUncheckedUpdateWithoutStorySentencesInput>
  }

  export type SentenceUpdateOneRequiredWithoutLinksNestedInput = {
    create?: XOR<SentenceCreateWithoutLinksInput, SentenceUncheckedCreateWithoutLinksInput>
    connectOrCreate?: SentenceCreateOrConnectWithoutLinksInput
    upsert?: SentenceUpsertWithoutLinksInput
    connect?: SentenceWhereUniqueInput
    update?: XOR<XOR<SentenceUpdateToOneWithWhereWithoutLinksInput, SentenceUpdateWithoutLinksInput>, SentenceUncheckedUpdateWithoutLinksInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type SentenceCreateWithoutDocumentInput = {
    id?: string
    index: number
    text: string
    links?: StorySentenceCreateNestedManyWithoutSentenceInput
  }

  export type SentenceUncheckedCreateWithoutDocumentInput = {
    id?: string
    index: number
    text: string
    links?: StorySentenceUncheckedCreateNestedManyWithoutSentenceInput
  }

  export type SentenceCreateOrConnectWithoutDocumentInput = {
    where: SentenceWhereUniqueInput
    create: XOR<SentenceCreateWithoutDocumentInput, SentenceUncheckedCreateWithoutDocumentInput>
  }

  export type SentenceCreateManyDocumentInputEnvelope = {
    data: SentenceCreateManyDocumentInput | SentenceCreateManyDocumentInput[]
  }

  export type UserStoryCreateWithoutDocumentInput = {
    id?: string
    storyCode: string
    actor: string
    action: string
    benefit: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storySentences?: StorySentenceCreateNestedManyWithoutStoryInput
  }

  export type UserStoryUncheckedCreateWithoutDocumentInput = {
    id?: string
    storyCode: string
    actor: string
    action: string
    benefit: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storySentences?: StorySentenceUncheckedCreateNestedManyWithoutStoryInput
  }

  export type UserStoryCreateOrConnectWithoutDocumentInput = {
    where: UserStoryWhereUniqueInput
    create: XOR<UserStoryCreateWithoutDocumentInput, UserStoryUncheckedCreateWithoutDocumentInput>
  }

  export type UserStoryCreateManyDocumentInputEnvelope = {
    data: UserStoryCreateManyDocumentInput | UserStoryCreateManyDocumentInput[]
  }

  export type SentenceUpsertWithWhereUniqueWithoutDocumentInput = {
    where: SentenceWhereUniqueInput
    update: XOR<SentenceUpdateWithoutDocumentInput, SentenceUncheckedUpdateWithoutDocumentInput>
    create: XOR<SentenceCreateWithoutDocumentInput, SentenceUncheckedCreateWithoutDocumentInput>
  }

  export type SentenceUpdateWithWhereUniqueWithoutDocumentInput = {
    where: SentenceWhereUniqueInput
    data: XOR<SentenceUpdateWithoutDocumentInput, SentenceUncheckedUpdateWithoutDocumentInput>
  }

  export type SentenceUpdateManyWithWhereWithoutDocumentInput = {
    where: SentenceScalarWhereInput
    data: XOR<SentenceUpdateManyMutationInput, SentenceUncheckedUpdateManyWithoutDocumentInput>
  }

  export type SentenceScalarWhereInput = {
    AND?: SentenceScalarWhereInput | SentenceScalarWhereInput[]
    OR?: SentenceScalarWhereInput[]
    NOT?: SentenceScalarWhereInput | SentenceScalarWhereInput[]
    id?: StringFilter<"Sentence"> | string
    documentId?: StringFilter<"Sentence"> | string
    index?: IntFilter<"Sentence"> | number
    text?: StringFilter<"Sentence"> | string
  }

  export type UserStoryUpsertWithWhereUniqueWithoutDocumentInput = {
    where: UserStoryWhereUniqueInput
    update: XOR<UserStoryUpdateWithoutDocumentInput, UserStoryUncheckedUpdateWithoutDocumentInput>
    create: XOR<UserStoryCreateWithoutDocumentInput, UserStoryUncheckedCreateWithoutDocumentInput>
  }

  export type UserStoryUpdateWithWhereUniqueWithoutDocumentInput = {
    where: UserStoryWhereUniqueInput
    data: XOR<UserStoryUpdateWithoutDocumentInput, UserStoryUncheckedUpdateWithoutDocumentInput>
  }

  export type UserStoryUpdateManyWithWhereWithoutDocumentInput = {
    where: UserStoryScalarWhereInput
    data: XOR<UserStoryUpdateManyMutationInput, UserStoryUncheckedUpdateManyWithoutDocumentInput>
  }

  export type UserStoryScalarWhereInput = {
    AND?: UserStoryScalarWhereInput | UserStoryScalarWhereInput[]
    OR?: UserStoryScalarWhereInput[]
    NOT?: UserStoryScalarWhereInput | UserStoryScalarWhereInput[]
    id?: StringFilter<"UserStory"> | string
    documentId?: StringFilter<"UserStory"> | string
    storyCode?: StringFilter<"UserStory"> | string
    actor?: StringFilter<"UserStory"> | string
    action?: StringFilter<"UserStory"> | string
    benefit?: StringFilter<"UserStory"> | string
    status?: StringFilter<"UserStory"> | string
    createdAt?: DateTimeFilter<"UserStory"> | Date | string
    updatedAt?: DateTimeFilter<"UserStory"> | Date | string
  }

  export type DocumentCreateWithoutSentencesInput = {
    id?: string
    title: string
    content: string
    status?: string
    truncated?: boolean
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userStories?: UserStoryCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutSentencesInput = {
    id?: string
    title: string
    content: string
    status?: string
    truncated?: boolean
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userStories?: UserStoryUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutSentencesInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutSentencesInput, DocumentUncheckedCreateWithoutSentencesInput>
  }

  export type StorySentenceCreateWithoutSentenceInput = {
    id?: string
    llmVerdict: boolean
    confidenceScore?: number | null
    llmReason?: string | null
    embeddingSimilarity?: number | null
    verificationStatus?: string
    story: UserStoryCreateNestedOneWithoutStorySentencesInput
  }

  export type StorySentenceUncheckedCreateWithoutSentenceInput = {
    id?: string
    storyId: string
    llmVerdict: boolean
    confidenceScore?: number | null
    llmReason?: string | null
    embeddingSimilarity?: number | null
    verificationStatus?: string
  }

  export type StorySentenceCreateOrConnectWithoutSentenceInput = {
    where: StorySentenceWhereUniqueInput
    create: XOR<StorySentenceCreateWithoutSentenceInput, StorySentenceUncheckedCreateWithoutSentenceInput>
  }

  export type StorySentenceCreateManySentenceInputEnvelope = {
    data: StorySentenceCreateManySentenceInput | StorySentenceCreateManySentenceInput[]
  }

  export type DocumentUpsertWithoutSentencesInput = {
    update: XOR<DocumentUpdateWithoutSentencesInput, DocumentUncheckedUpdateWithoutSentencesInput>
    create: XOR<DocumentCreateWithoutSentencesInput, DocumentUncheckedCreateWithoutSentencesInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutSentencesInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutSentencesInput, DocumentUncheckedUpdateWithoutSentencesInput>
  }

  export type DocumentUpdateWithoutSentencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    truncated?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userStories?: UserStoryUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutSentencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    truncated?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userStories?: UserStoryUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type StorySentenceUpsertWithWhereUniqueWithoutSentenceInput = {
    where: StorySentenceWhereUniqueInput
    update: XOR<StorySentenceUpdateWithoutSentenceInput, StorySentenceUncheckedUpdateWithoutSentenceInput>
    create: XOR<StorySentenceCreateWithoutSentenceInput, StorySentenceUncheckedCreateWithoutSentenceInput>
  }

  export type StorySentenceUpdateWithWhereUniqueWithoutSentenceInput = {
    where: StorySentenceWhereUniqueInput
    data: XOR<StorySentenceUpdateWithoutSentenceInput, StorySentenceUncheckedUpdateWithoutSentenceInput>
  }

  export type StorySentenceUpdateManyWithWhereWithoutSentenceInput = {
    where: StorySentenceScalarWhereInput
    data: XOR<StorySentenceUpdateManyMutationInput, StorySentenceUncheckedUpdateManyWithoutSentenceInput>
  }

  export type StorySentenceScalarWhereInput = {
    AND?: StorySentenceScalarWhereInput | StorySentenceScalarWhereInput[]
    OR?: StorySentenceScalarWhereInput[]
    NOT?: StorySentenceScalarWhereInput | StorySentenceScalarWhereInput[]
    id?: StringFilter<"StorySentence"> | string
    storyId?: StringFilter<"StorySentence"> | string
    sentenceId?: StringFilter<"StorySentence"> | string
    llmVerdict?: BoolFilter<"StorySentence"> | boolean
    confidenceScore?: FloatNullableFilter<"StorySentence"> | number | null
    llmReason?: StringNullableFilter<"StorySentence"> | string | null
    embeddingSimilarity?: FloatNullableFilter<"StorySentence"> | number | null
    verificationStatus?: StringFilter<"StorySentence"> | string
  }

  export type DocumentCreateWithoutUserStoriesInput = {
    id?: string
    title: string
    content: string
    status?: string
    truncated?: boolean
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentences?: SentenceCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutUserStoriesInput = {
    id?: string
    title: string
    content: string
    status?: string
    truncated?: boolean
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentences?: SentenceUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutUserStoriesInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutUserStoriesInput, DocumentUncheckedCreateWithoutUserStoriesInput>
  }

  export type StorySentenceCreateWithoutStoryInput = {
    id?: string
    llmVerdict: boolean
    confidenceScore?: number | null
    llmReason?: string | null
    embeddingSimilarity?: number | null
    verificationStatus?: string
    sentence: SentenceCreateNestedOneWithoutLinksInput
  }

  export type StorySentenceUncheckedCreateWithoutStoryInput = {
    id?: string
    sentenceId: string
    llmVerdict: boolean
    confidenceScore?: number | null
    llmReason?: string | null
    embeddingSimilarity?: number | null
    verificationStatus?: string
  }

  export type StorySentenceCreateOrConnectWithoutStoryInput = {
    where: StorySentenceWhereUniqueInput
    create: XOR<StorySentenceCreateWithoutStoryInput, StorySentenceUncheckedCreateWithoutStoryInput>
  }

  export type StorySentenceCreateManyStoryInputEnvelope = {
    data: StorySentenceCreateManyStoryInput | StorySentenceCreateManyStoryInput[]
  }

  export type DocumentUpsertWithoutUserStoriesInput = {
    update: XOR<DocumentUpdateWithoutUserStoriesInput, DocumentUncheckedUpdateWithoutUserStoriesInput>
    create: XOR<DocumentCreateWithoutUserStoriesInput, DocumentUncheckedCreateWithoutUserStoriesInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutUserStoriesInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutUserStoriesInput, DocumentUncheckedUpdateWithoutUserStoriesInput>
  }

  export type DocumentUpdateWithoutUserStoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    truncated?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentences?: SentenceUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutUserStoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    truncated?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentences?: SentenceUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type StorySentenceUpsertWithWhereUniqueWithoutStoryInput = {
    where: StorySentenceWhereUniqueInput
    update: XOR<StorySentenceUpdateWithoutStoryInput, StorySentenceUncheckedUpdateWithoutStoryInput>
    create: XOR<StorySentenceCreateWithoutStoryInput, StorySentenceUncheckedCreateWithoutStoryInput>
  }

  export type StorySentenceUpdateWithWhereUniqueWithoutStoryInput = {
    where: StorySentenceWhereUniqueInput
    data: XOR<StorySentenceUpdateWithoutStoryInput, StorySentenceUncheckedUpdateWithoutStoryInput>
  }

  export type StorySentenceUpdateManyWithWhereWithoutStoryInput = {
    where: StorySentenceScalarWhereInput
    data: XOR<StorySentenceUpdateManyMutationInput, StorySentenceUncheckedUpdateManyWithoutStoryInput>
  }

  export type UserStoryCreateWithoutStorySentencesInput = {
    id?: string
    storyCode: string
    actor: string
    action: string
    benefit: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    document: DocumentCreateNestedOneWithoutUserStoriesInput
  }

  export type UserStoryUncheckedCreateWithoutStorySentencesInput = {
    id?: string
    documentId: string
    storyCode: string
    actor: string
    action: string
    benefit: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStoryCreateOrConnectWithoutStorySentencesInput = {
    where: UserStoryWhereUniqueInput
    create: XOR<UserStoryCreateWithoutStorySentencesInput, UserStoryUncheckedCreateWithoutStorySentencesInput>
  }

  export type SentenceCreateWithoutLinksInput = {
    id?: string
    index: number
    text: string
    document: DocumentCreateNestedOneWithoutSentencesInput
  }

  export type SentenceUncheckedCreateWithoutLinksInput = {
    id?: string
    documentId: string
    index: number
    text: string
  }

  export type SentenceCreateOrConnectWithoutLinksInput = {
    where: SentenceWhereUniqueInput
    create: XOR<SentenceCreateWithoutLinksInput, SentenceUncheckedCreateWithoutLinksInput>
  }

  export type UserStoryUpsertWithoutStorySentencesInput = {
    update: XOR<UserStoryUpdateWithoutStorySentencesInput, UserStoryUncheckedUpdateWithoutStorySentencesInput>
    create: XOR<UserStoryCreateWithoutStorySentencesInput, UserStoryUncheckedCreateWithoutStorySentencesInput>
    where?: UserStoryWhereInput
  }

  export type UserStoryUpdateToOneWithWhereWithoutStorySentencesInput = {
    where?: UserStoryWhereInput
    data: XOR<UserStoryUpdateWithoutStorySentencesInput, UserStoryUncheckedUpdateWithoutStorySentencesInput>
  }

  export type UserStoryUpdateWithoutStorySentencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    storyCode?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    benefit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutUserStoriesNestedInput
  }

  export type UserStoryUncheckedUpdateWithoutStorySentencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    storyCode?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    benefit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SentenceUpsertWithoutLinksInput = {
    update: XOR<SentenceUpdateWithoutLinksInput, SentenceUncheckedUpdateWithoutLinksInput>
    create: XOR<SentenceCreateWithoutLinksInput, SentenceUncheckedCreateWithoutLinksInput>
    where?: SentenceWhereInput
  }

  export type SentenceUpdateToOneWithWhereWithoutLinksInput = {
    where?: SentenceWhereInput
    data: XOR<SentenceUpdateWithoutLinksInput, SentenceUncheckedUpdateWithoutLinksInput>
  }

  export type SentenceUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    document?: DocumentUpdateOneRequiredWithoutSentencesNestedInput
  }

  export type SentenceUncheckedUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
  }

  export type SentenceCreateManyDocumentInput = {
    id?: string
    index: number
    text: string
  }

  export type UserStoryCreateManyDocumentInput = {
    id?: string
    storyCode: string
    actor: string
    action: string
    benefit: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SentenceUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    links?: StorySentenceUpdateManyWithoutSentenceNestedInput
  }

  export type SentenceUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    links?: StorySentenceUncheckedUpdateManyWithoutSentenceNestedInput
  }

  export type SentenceUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
  }

  export type UserStoryUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    storyCode?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    benefit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storySentences?: StorySentenceUpdateManyWithoutStoryNestedInput
  }

  export type UserStoryUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    storyCode?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    benefit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storySentences?: StorySentenceUncheckedUpdateManyWithoutStoryNestedInput
  }

  export type UserStoryUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    storyCode?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    benefit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorySentenceCreateManySentenceInput = {
    id?: string
    storyId: string
    llmVerdict: boolean
    confidenceScore?: number | null
    llmReason?: string | null
    embeddingSimilarity?: number | null
    verificationStatus?: string
  }

  export type StorySentenceUpdateWithoutSentenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    llmVerdict?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    llmReason?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingSimilarity?: NullableFloatFieldUpdateOperationsInput | number | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    story?: UserStoryUpdateOneRequiredWithoutStorySentencesNestedInput
  }

  export type StorySentenceUncheckedUpdateWithoutSentenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    storyId?: StringFieldUpdateOperationsInput | string
    llmVerdict?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    llmReason?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingSimilarity?: NullableFloatFieldUpdateOperationsInput | number | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
  }

  export type StorySentenceUncheckedUpdateManyWithoutSentenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    storyId?: StringFieldUpdateOperationsInput | string
    llmVerdict?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    llmReason?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingSimilarity?: NullableFloatFieldUpdateOperationsInput | number | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
  }

  export type StorySentenceCreateManyStoryInput = {
    id?: string
    sentenceId: string
    llmVerdict: boolean
    confidenceScore?: number | null
    llmReason?: string | null
    embeddingSimilarity?: number | null
    verificationStatus?: string
  }

  export type StorySentenceUpdateWithoutStoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    llmVerdict?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    llmReason?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingSimilarity?: NullableFloatFieldUpdateOperationsInput | number | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    sentence?: SentenceUpdateOneRequiredWithoutLinksNestedInput
  }

  export type StorySentenceUncheckedUpdateWithoutStoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentenceId?: StringFieldUpdateOperationsInput | string
    llmVerdict?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    llmReason?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingSimilarity?: NullableFloatFieldUpdateOperationsInput | number | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
  }

  export type StorySentenceUncheckedUpdateManyWithoutStoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentenceId?: StringFieldUpdateOperationsInput | string
    llmVerdict?: BoolFieldUpdateOperationsInput | boolean
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    llmReason?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingSimilarity?: NullableFloatFieldUpdateOperationsInput | number | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
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