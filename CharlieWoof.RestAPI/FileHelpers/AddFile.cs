using System;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace CharlieWoof.RestAPI.FileHelpers
{
    public static class FileHelper
    {
        /// <summary>
        /// Зберігає зображення у вказаним шляхом
        /// </summary>
        /// <param name="File">файл зображення</param>
        /// <param name="ServerPath">шлях збереження</param>
        /// <param name="ReplaceExisted">true, якщо хочем замінити файл(defaul false)</param>
        public static string Save(IFormFile File, string ServerPath, bool ReplaceExisted = false)
        {
            var filename = Path.GetFileName(File.FileName);

            //якщо така фотка існує, треба додати до початку назви якусь цифру
            if (!ReplaceExisted && System.IO.File.Exists(Path.Combine(ServerPath, filename)))
            {
                Random RAND = new Random();
                filename = RAND.Next(0, 999999999) + filename;
            }

            var path = Path.Combine(ServerPath, filename);


            using (var stream = new FileStream(path, FileMode.Create))
            {
                File.CopyTo(stream);
            }


            return filename;
        }
    }
}