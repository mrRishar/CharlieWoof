using Dispenser.Hasher.Sha256;

namespace Extensions.Encrypt
{
    public static class Sha256GeneratorAdapter
    {
        public static string Generate(string input)
        {
            var _hasher = new Sha256Hasher();
            var obj = new { StringValue= input };
            return _hasher.Hash(obj);
        }
    }
}